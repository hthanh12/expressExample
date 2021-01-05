const config = require('../config');
const jwt = require('jsonwebtoken');
const {User} = require('../model');
const response = require('../utils/response')


exports.isLogged = async(req,res, next) =>{
    try {
        const nowInUnixSeconds = Math.floor(new Date() / 1000)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null)
        return response.unauthorized(res,{message:'Unauthorized'});
        let tokenInfo
        await new Promise((resolve, reject) => {
         jwt.verify(token, config.jwt_secret,(err, decoded) => {
             console.log(decoded)
            if (err) {
                console.log(err)
                return response.error(res,{message:'Token is invalid'})
              }
            if(decoded.exp <= nowInUnixSeconds) {
                return response.error(res,{message: 'Token is expired!' })
            }
            console.log('verify token done')
            tokenInfo = decoded
            resolve(tokenInfo);
        })})
        let user = await User.findByPk(tokenInfo.id);
        if(!user)         
        return response.unauthorized(res,{message:'Unauthorized'});
        req.user = user;
        console.log(req.user)
        next()
    } catch (error) {
        return response.error(res,{error});
    }
}