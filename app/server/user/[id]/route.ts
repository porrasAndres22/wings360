import { NextResponse } from "next/server"
import { connectDb } from '@/config/config'


export const GET = async (request: Request, {params}: RouteContext<'/server/user/[id]'>) => {
    connectDb()
    const { id } = await params
    return NextResponse.json({
        message: `Get Data${id}`
    })
}