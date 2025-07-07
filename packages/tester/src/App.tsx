import { use, useEffect, useState } from 'react'
import './App.css'
import * as brdige from "@blazyts/http-bridge"



function App() {
  const [count, setCount] = useState(0)
  const [state,setState] = useState()
  useEffect(() => {
    brdige.client.fs.readFile.post({path: "./"}).then((res) => {
      console.log(res)
      setState(res.data)
    })
  }, [])
  return (
    <div>{state}</div>
  )
}

export default App
