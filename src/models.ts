// models.ts

import 'dotenv/config'
import { Schema, createConnection } from 'mongoose'
import { Rectangle } from './types'

export const connection = createConnection(process.env.MONGODB_URI ?? "")

export const rectangleSchema = new Schema<Rectangle>({
	name: {type:String, required:true},
	width: {type:Number, required:true},
	height: {type:Number, required:true}
})

export const RectangleModel = connection.model<Rectangle>('rectangle', rectangleSchema)
