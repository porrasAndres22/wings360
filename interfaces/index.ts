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
  name: string
  status: string
  competencies: {
    id: string
    name: string
    order: number
    questions: {
      id: string
      text: string
      order: number
    }[]
  }[]
  likertScale: {
    id: string
    value: number
    label: string
    order: number
  }[],
  metadata: {
    totalCompetencies: number
    totalQuestions: number
    totalScaleOptions: number
    status: string,
    current: number,
    max: number,
    colorScheme: string
    createdAt: string
  }
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


// Types
export type ColorDealSchemaType = "light" | "lime" | "purple" | "coral" | "cyan" | "indigo" | "amber" | "rose" | "emerald" | "slate";

export interface ColorDealSchema {
    name: string
    card: string
    text: string
    subtext: string
    percentage: string
    iconBg: string
    iconColor: string
    dotsfilled: string
    dotsempty: string
    shadow: string
}
