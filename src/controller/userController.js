
const {User} = require('../model');
const response = require('../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.login = async(req, res)=>{
    try {
        let {username, password} = req.body;
        let user = await User.findOne({ where: { username} })

        if(!user) return response.error(res,{error:'Not found user'})

        const match = await bcrypt.compare(password,user.password);

        if(!match)
            return response.success(res,{error:'Wrong password'})
        else{
            let token = jwt.sign({id:user.id,
            }, config.jwt_secret);
            delete user.dataValues.password;
            return response.success(res,{data:{token,user}})
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.create = async(req, res) =>{
   
        console.log('123')

        let {password,username} = req.body;
        let hashPwd = await bcrypt.hash(password, 256)

        let user = await User.findOne({where: {username:username}})
        if(user) return response.success(res,{data:'Username already exists'});
        let createUser = await User.create({
            username,
            password:hashPwd,
          });

        
        return response.success(res,{data:createUser});
 
    
}

exports.checkToken = async(req, res)=>{
    try {
        let user = req.user;
        delete user.dataValues.password;
        if(!user)
            return response.success(res,{error:'Not found user'})
        else
            return response.success(res,{data:user})
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.changePassword = async(req, res)=>{
    try {
        let user = req.user;
        let {passwordOld, passwordNew} = req.body;
        // if(!passwordOld || !passwordNew) return response.success(res, {error:''})

        delete user.dataValues.password;
        if(!user)
            return response.success(res,{error:'Not found user'})
    
        return response.success(res,{data:'Change password success'})
    } catch (error) {
        console.log(error);
        return error;
    }
}