import { NextResponse } from "next/server"
import { connectDb } from "@/config"
import { UserModelSchema, SchemaModelSchema } from '@/model'
import { ProccesSchema } from '@/interfaces'


export const GET = async () => {
    connectDb()
    const data = await UserModelSchema.find()
    return NextResponse.json(data)
}

export const POST = async (request: Request) => {
    try {
        connectDb()
        const dataRequest: ProccesSchema = await request.json()
        const findSchema: ProccesSchema | null = await SchemaModelSchema.findOne({ name: dataRequest.name })
        if (!findSchema) {
            const dataSave = await new SchemaModelSchema(dataRequest).save()
            return NextResponse.json({
                message: {
                    status: true,
                    data: "create"
                }
            })
        }
        console.log(findSchema.name)
        return NextResponse.json({
            message: {
                status: true,
                data: "userFind"
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: {
                status: false,
                data: error
            }
        })
    }
}