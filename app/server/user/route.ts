import { NextResponse } from "next/server"
import { UserModelSchema } from '@/model'
import { connectDb } from "@/config"

export const GET = async () => {
    connectDb()
    const data = await UserModelSchema.find()
    return NextResponse.json(data)
}

export const POST = async (request: Request) => {
    try {
        const { type, data, access }: { type: string, data: string, access: string } = await request.json()
        connectDb()
        if (type == "create") {

            const { name }: { name: String | boolean } = await UserModelSchema.findOne({ name: data }) || { name: false }

            if (!name) {

                const { name }: { name: String | boolean } = await new UserModelSchema({ name: data }).save() || { name: false }

                return NextResponse.json({
                    fetchUser: name
                })
            }

            return NextResponse.json({
                fetchUser: name
            })

        } else if (type == "find") {
            const schemaResponse = await UserModelSchema.findOne({ name: data })
            return NextResponse.json({
                fetchUser: schemaResponse
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: error
        })
    }
}