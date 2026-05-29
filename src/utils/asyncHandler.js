
// this is a utility function that wraps asynchronous route handlers in an Express application. It allows you to handle errors in a consistent way without having to write try-catch blocks in every route handler.




const asyncHandler =(resuestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(resuestHandler(req,res,next)).
        catch((err)=>next(err))
}
}




export{asyncHandler}






























// const asyncHandler = (fn) =>async (req,res,next)=>{

//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message || "Internal Server Error"
//         })
        
//     }
// }