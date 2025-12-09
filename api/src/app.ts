import express from "express"
import morgan from "morgan"
import cors from "cors"
import multer from "multer";
import { configEvn, configFrontFolder } from "./config"
import router from './app.router'

const app = express()

app.set(`port`, configEvn.PORT)

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(configFrontFolder(__dirname ,'/public')))
app.use(router)

export default app
