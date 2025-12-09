import { Router } from "express"
import { Resend } from 'resend';
import { configFrontFolder } from "./config"
import { UserSchema } from "./model/model.user"
import { ProccesModelSchema } from "./model/model.proccess"
import { ConnectionUserSchema } from "./model/model.connection";

const router = Router()

router.get('/', (req, res) => {
    res.sendFile(configFrontFolder(__dirname, '/static/index.html'))
})

router.get('/proccess', (req, res) => {
    res.sendFile(configFrontFolder(__dirname, '/static/proccess.html'))
})

////////////////////////////////////////////////////////////

router.get('/user', async (req, res) => {
    const data = await UserSchema.find()
    res.json(data)
})
router.post('/createUser', async (req, res) => {
    const data = await UserSchema.create(req.body)
    res.json({"Hola": "hola"})
})
router.post('/findUser', async (req, res) => {
    const data = await UserSchema.find(req.body)
    res.json(data)
})
router.put('/user', async (req, res) => {
    const data = await UserSchema.find()
    res.json({"hola": `${data}`})
})
router.delete('/user', async (req, res) => {
    const data = await UserSchema.find()
    res.json({"hola": `${data}`})
})

////////////////////////////////////////////////////////////

router.post('/proccesCreateSchema', async (req, res) => {
    const data = await ProccesModelSchema.create(req.body)
    res.json(data)
})

router.post('/proccesFindOneSchema', async (req, res) => {
    const data = await ProccesModelSchema.findOne(req.body)
    res.json(data)
})

////////////////////////////////////////////////////////////
router.post('/connectionSchema', async (req, res) => {
    const data = await ConnectionUserSchema.create(req.body)
    res.json(data)
})

router.post('/connectionSchemaFind', async (req, res) => {
    const data = await ConnectionUserSchema.find(req.body)
    res.json(data)
})


////////////////////// Manifest ////////////////////////////
router.get('/manifest.json', (req, res) => {
    res.sendFile(configFrontFolder(__dirname, '/manifest.json'))
})

////////////////////// Connection CRUD Car ////////////////////////////

router.post('/resend/', async (req, res) => {
    try {

        const resend = new Resend('re_ZWoaAiDE_9heMuH7K5Hf4DBrcgM4zNPBm');

        const dataBody: {
            name: string
            correo: string
            modelo: string
            marca: string
            description: string
        } = req.body

        const { data, error } = await resend.emails.send({
            from: 'Intercars <noreply@supermoon-developer.lat>',
            to: [`import.intercarsgt@outlook.com`],
            subject: 'Sujeteto Interesado en Vehiculo',
            html: `
            <strong>Mi nombre y mi correo son ${dataBody.name} ${dataBody.correo} Estoy interesado en este Vehiculo</strong>
            <strong>${dataBody.modelo}</strong>
            <strong>${dataBody.marca}</strong>
            <strong>${dataBody.description}</strong>
            `,
        });

        console.log(data)

        // re_ZWoaAiDE_9heMuH7K5Hf4DBrcgM4zNPBm


        // const dataResultMongoose: any = await VehicleDataSchema.create(dataBody);
        res.json({ "dataCar": dataBody })
    } catch (error) {
        res.json({ "error": error })
    }
})

////////////////////// Static ////////////////////////////

router.get('/static/:type/:name', (req, res) => {
    const { type, name}: {type: string, name: string} = req.params
    res.sendFile(configFrontFolder(__dirname, `/static/${type}/${name}`))
})





export default router
