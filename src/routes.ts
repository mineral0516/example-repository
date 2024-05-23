// routes.ts

import Router from '@koa/router'
import { Next, ParameterizedContext } from 'koa'
import { z } from 'zod'
import { RectangleModel } from './models'
import { Rectangle, rectangleZodSchema, State } from './types'

const router = new Router<State>()

export default router

router.get('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)

  const found = await RectangleModel.findOne({ name: paramparse.data.name }).lean().exec()
  ctx.assert(found, 404)

  ctx.status = 200
  ctx.body = found

  await next()
})

router.post('/rectangle', async (ctx: ParameterizedContext<State>, next: Next) => {
  const bodyparse = rectangleZodSchema.safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const found = await RectangleModel.findOne({ name: bodyparse.data.name }).lean().exec()
  ctx.assert(found === null, 409)

  const model = new RectangleModel(bodyparse.data)
  await model.save()

  ctx.status = 201

  await next()
})

router.delete('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)
  const document = await RectangleModel.findOne({ name: paramparse.data.name }).exec()
  ctx.assert(document, 404)

  await document.deleteOne()

  ctx.status = 200 // maybe 204

  await next()
})

router.patch('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)
  const bodyparse = z.object({ width: z.number(), height: z.number() }).safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const document = await RectangleModel.findOne({ name: paramparse.data.name }).exec()
  ctx.assert(document, 404)

  await document.updateOne({
    ...paramparse.data,
    ...bodyparse.data
  })

  ctx.status = 200 // maybe 204

  await next()
})