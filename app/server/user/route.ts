import { NextResponse } from "next/server"
import { UserSchema } from '@/model/model.user'
import { connectDb } from "@/config/config"


export const GET = async () => {
    connectDb()
    const data = await UserSchema.find()
    return NextResponse.json(data)
}

export const POST = async (request: Request) => {
    // try {
    connectDb()
    const { type, data } = await request.json()
    if (type == "create") {

        const { name }: { name: String | boolean } = await UserSchema.findOne({ name: data }) || { name: false }
        
        if (!name) {

            const { name }: { name: String | boolean } = await new UserSchema({ name: data }).save() || { name: false }

            return NextResponse.json({
                fetchUser: name
            })
        }

        return NextResponse.json({
            fetchUser: name
        })

    } else if (type == "find") {
        const schemaResponse = await UserSchema.findOne({ name: data })
        return NextResponse.json({
            fetchUser: schemaResponse
        })
    }
    // } catch (error) {
    //     return NextResponse.json({
    //         message: error
    //     })
    // }
}