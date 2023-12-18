const jwt = require('jsonwebtoken')
const SeceretKey = "this is hero";
function Verify(req,res,next){
   
  
  if(req.params.token){
    jwt.verify(req.params.token,SeceretKey,(err,decode)=>{
        if(err){
            res.json({
                messege:'In valid token'
            })
        }else{
            req.body = decode;
           
            next();
        }
    })
  }else{
    res.json({
        messege:"Token is required"
    })
  }
}
module.exports = Verify;