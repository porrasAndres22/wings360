import { Schema, model } from 'mongoose'
import { ProccesSchema } from '@/config/global.interfaces'

export const ProccesModelSchema = model('proccess', new Schema<ProccesSchema>({
    nameProccess: {
        type: String,
        required: true,
        trim: true,
    },
    yearProccess: {
        type: Number,
        required: true,
        trim: true,
    },
    competencess: {
        type: [String],
        trim: true,
    },
    answers: {
        type: {},
        trim: true,
    },
    scaleValues: {
        type: [String],
        required: true,
        trim: true,
    },
}, {
    versionKey: false
}))