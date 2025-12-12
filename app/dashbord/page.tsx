"use client"
import { useState } from "react"



export default () => {

  const [data, setData] = useState("")

  const local = async () => {
    const value: any = await (await fetch('http://localhost:5000')).json()
    setData(value.hola)
  }


  return (
    <button onClick={local}>{data == "" ? "data" : data}</button>
  )
}

