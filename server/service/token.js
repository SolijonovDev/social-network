const jwt=require("jsonwebtoken")

const generateToken=async (payload)=>{
       const accessToken=await jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:"48h"})
       const refreshToken=await jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:"240h"})
       return {accessToken,refreshToken};
}

module.exports=generateToken;