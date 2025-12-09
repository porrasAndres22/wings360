import app from "./app"
import { connectMongoose, portServe } from './config'


(async () => {
    if (await portServe()) app.listen(app.get(`port`), () => connectMongoose())
})()