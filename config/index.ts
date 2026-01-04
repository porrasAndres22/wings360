import { connect } from 'mongoose'

const connectStatus: {isConnected: boolean} = {
    isConnected: false
}

export const connectDb = async () => {
    if (connectStatus.isConnected) return
    await connect(process.env.MONGO_URL || "")
    connectStatus.isConnected = true
}