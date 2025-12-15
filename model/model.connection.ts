import { Schema, model } from 'mongoose'
import { ConnectionUser } from '@/config/global.interfaces'

export const ConnectionUserSchema = model('connection', new Schema<ConnectionUser>({
    nameUser: {
        type: String,
        required: true,
        trim: true,
    },
    bossUser: {
        type: String,
        required: true,
        trim: true,
    },
    appointmentUser: {
        type: String,
        required: true,
        trim: true,
    },
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
    relations: [{
        status: {
            type: Boolean,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        }
    }],
    data: {},
    accion: {}
}, {
    versionKey: false
}))