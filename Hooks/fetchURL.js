import axios from "axios"
import { useState , useEffect } from "react"
export const useftech =(URl,type,id)=>{
const [data,setData] = useState()
const [isSuccess,setSuccess] = useState(false)
const [isloading, setLoading] = useState(false)
      useEffect(()=>{
        const fetchURl =  async()=>{
          try {
            setLoading(true)
         const response = await axios.get(URl)
         setData(response.data[type])
         setSuccess(true)
          } catch (error) {console.log(error)  
            setSuccess(false) }
          finally{ 
            setLoading(false)
            }}

            fetchURl()
          },[id])
 return {data,isSuccess,isloading}
}