import fs from 'fs'
import { resolve } from "path";
import { configFrontFolder } from './config'


export const scanFolder = () => {
    const masterRootCar = configFrontFolder(__dirname, '/cars')
    const addVehicles = (listFolder: string[]) => {
    
        const listDataFile = listFolder.map((element) => resolve(`${masterRootCar}/${element}/data.json`))
    
        listDataFile.forEach((element) => {
            const dataInsert = fs.readFileSync(element, 'utf-8')
            const dataRecive = fs.readFileSync(configFrontFolder(__dirname, '/assets/test-listCars.json'), 'utf-8')
            const dataAllCars = JSON.parse(dataRecive)
            const dataOnlyCars = JSON.parse(dataInsert)
    
            dataAllCars.unshift(dataOnlyCars.car)
            fs.writeFileSync(configFrontFolder(__dirname, '/assets/test-listCars.json'), JSON.stringify(dataAllCars))
        })
    }
    const findNewCar = () => {
        const listFolder = fs.readdirSync(masterRootCar)
        const dataVehicles = fs.readFileSync(configFrontFolder(__dirname, '/assets/test-listCars.json'), 'utf-8')
        const extractNameId = JSON.parse(dataVehicles).map((element: any) => element.nameId)
        addVehicles(listFolder.filter((element) => !extractNameId.includes(element)))
        console.log("update")
    }
    
    fs.watch(masterRootCar, (eventType, filename) => {
        findNewCar()
    });
}