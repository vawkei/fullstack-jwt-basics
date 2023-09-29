const errorHandlerMiddleware =async (req,res)=>{
    return res.status(500).json({msg:"Something went wrong"} )
}