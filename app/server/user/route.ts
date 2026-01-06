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
        return NextResponse.json({
            message: "ok" 
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        })
    }
}