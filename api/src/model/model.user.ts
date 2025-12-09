import { Schema, model } from 'mongoose'
import { usuarios } from '../global.interfaces'

export const UserSchema = model('users', new Schema<usuarios>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: Boolean,
        required: true,
        trim: true,
    },
    schemaProcces: {
        type: [Object],
        trim: true,
    }
}, {
    versionKey: false
}))