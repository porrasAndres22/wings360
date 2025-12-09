import dotenv from 'dotenv'
import { resolve, join, extname } from 'path'
import mongoose from 'mongoose'
import multer from 'multer'
import { detect } from 'detect-port'
import { exec } from 'child_process'
import { ConfigEnv } from './global.interfaces'

dotenv.config()

// Config .env proccess file
export const configEvn: ConfigEnv = {
    PORT: (typeof process.env.PORT == "string" ? parseInt(process.env.PORT) : process.env.PORT) || 4000,
    HOST: process.env.HOST || undefined,
    MONGO_URL: process.env.MONGO_URL || 'http://localhost/',
    APIKEYINSERT: process.env.APIKEYINSERT || '0'
}

// Config root of static files web
export const configFrontFolder = (pathfront: string, front: string) => join(`${resolve(pathfront).split(join(`/${resolve(pathfront).split(join('/')).slice(-1)[0]}`))[0]}${front}`)

// Config conection with mongoose db
export const connectMongoose = async () => {
    try {
        
        console.log(`ok, ${(await mongoose.connect(configEvn.MONGO_URL)).connection.name}`)
    } catch (error) {
        return error
    }
}

// Config check if port is bussy
export const portServe = async () => {
    try {
        return await detect(configEvn.PORT) == configEvn.PORT ? true : false
    } catch (error) {
        return false
    }
}

// Config app to auto open 
export const openServe = () => {
    if (configEvn.HOST != undefined) {
        const intervalID = setInterval(async () => {
            // detected always retur 
            // if (await portServe()) {
            exec(`start ${configEvn.HOST}:${configEvn.PORT}`)
            clearInterval(intervalID)
            // }
        }, 1500)
    }
}
