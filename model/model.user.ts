import { Schema, model, models } from 'mongoose'
import { usuarios } from '@/config/global.interfaces'

export const UserSchema = models.Users || model('Users', new Schema<usuarios>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    schemaProcces: {
        type: [Object],
        trim: true,
    }
}, {
    versionKey: false
}))
