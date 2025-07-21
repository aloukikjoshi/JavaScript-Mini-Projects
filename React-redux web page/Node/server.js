  const express=require("express")
  const cors=require("cors")
const { default: axios } = require("axios")
const url="http://course-api.com/react-useReducer-cart-project"

  const server=express()
    
  server.use(express.json())
    server.use(cors())

  server.get("/api",async (req,res)=>{
    try{
       const response=await axios(url)
       const dataarr=response.data
        res.json({success:true,dataarr})
    }catch(err){
      console.log(err)
    }
  })


  server.listen(5000,()=>{
    console.log("listening")
  })