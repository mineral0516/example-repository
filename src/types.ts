// types.ts

import { z } from 'zod'

export type State = {
  start: number
}

export const rectangleZodSchema = z.object({
	name: z.string(),
	width: z.number(),
	height: z.number()
})

export type Rectangle = z.infer<typeof rectangleZodSchema>