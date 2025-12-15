export interface ConfigEnv {
  PORT: number
  HOST?: string
  MONGO_URL: string
  APIKEYINSERT: string
}

export interface usuarios {
  name: string
  email: string
  password: string
  type: ConstrainBoolean
  schemaProcces: Object[]
}

export interface ProccesSchema {
  nameProccess: string
  yearProccess: number
  competencess: string[]
  answers: any
  scaleValues: string[]
}

export interface ConnectionUser {
  nameUser: string
  bossUser: string
  appointmentUser: string
  nameProccess: string
  yearProccess: number
  relations: { status: boolean, name: string }[]
  data: any
  accion: any
}