import jwt from 'jsonwebtoken'

 const Verify= (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader == undefined) return res.status(401).send("Access denied")

    const token = authHeader

    try{
        const varified=jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=varified
        next()
    }
    catch(err){
        res.status(500).send("No token")
    }
}
export{Verify}