import { Schema, model, models } from 'mongoose'
import { ProccesSchema, ConnectionUser, usuarios } from '@/interfaces'

export const UserModelSchema = models.Users || model('Users', new Schema<usuarios>({
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

export const SchemaModelSchema = models.procesSchemas || model('procesSchemas', new Schema<ProccesSchema>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    competencies: [{
        id: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        order: {
            type: Number,
            required: true,
            trim: true,
        },
        questions: [{
            id: {
                type: String,
                required: true,
                trim: true,
            },
            text: {
                type: String,
                required: true,
                trim: true,
            },
            order: {
                type: Number,
                required: true,
                trim: true,
            },
        }],
    }],
    likertScale: [{
        id: {
            type: String,
            required: true,
            trim: true,
        },
        value: {
            type: Number,
            required: true,
            trim: true,
        },
        label: {
            type: String,
            required: true,
            trim: true,
        },
        order: {
            type: Number,
            required: true,
            trim: true,
        },
    }],
    metadata: {
        totalCompetencies: {
            type: Number,
            required: true,
            trim: true,
        },
        totalQuestions: {
            type: Number,
            required: true,
            trim: true,
        },
        totalScaleOptions: {
            type: Number,
            required: true,
            trim: true,
        },
        colorScheme: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: String,
            required: true,
            trim: true,
        },
    }
}, {
    versionKey: false
}))

export const ConnectionUserSchema = models.connection || model('connection', new Schema<ConnectionUser>({
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