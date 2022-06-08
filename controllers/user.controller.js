import ErrorHelper from "../helpers/error.helper"
import {uuid} from "uuidv4"
import AuthHelper from "../helpers/auth.helper";
import models from "../models";

import {OAuth2Client}  from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const login = async (req, res) => {


    // if not email or password, return
    if (!req.body.email || !req.body.password){
        return res.status(422).send(ErrorHelper.COMPLETE_ALL_FIELDS);
    }

    try{


        const user = await models.user.findOne({
            where:{
                email: req.body.email.toLowerCase(),
            }
        });

        if(!user) return res.status(400).send(ErrorHelper.USER_NOT_EXISTS);

        if(user.googleLogin) return res.status(403).send(ErrorHelper.GOOGLE_LOGIN_SUPPORTED);

        // verify that passwords are the same.
        const isSamePassword = await AuthHelper.isSamePassword(req.body.password, user.password);
        if(!isSamePassword) return res.status(403).send(ErrorHelper.INVALID_CREDENTIALS);

        const token = AuthHelper.generateAccessToken(user.id, '1d');

        return res.status(200).send({
            fullName: user.fullName,
            email: user.email,
            id: user.id,
            token: token
        });



    }catch(e){
        console.error(e);
        return res.status(400).send(ErrorHelper.GENERAL);
    }
};

const validateEmailAddress = email => {
    return /\w+@\w+\.\w{2,10}/.test(email)
}

const register = async ( req, res) => {

    if(!req.body.email || !req.body.password || !req.body.fullName){
        return res.status(400).send(ErrorHelper.INVALID_REGISTRATION_FIELDS);
    }

    if(!validateEmailAddress(req.body.email)){
        return res.status(400).send(ErrorHelper.INVALID_REGISTRATION_FIELDS);
    }

    try{

        const user = {
            id: uuid(),
            fullName: req.body.fullName,
            email: req.body.email.toLowerCase()
        }

        // hash user's password before inserting into db
        user.password = await AuthHelper.hashPassword(req.body.password);

        const userObj = await models.user.create(user);

        // generate a 1d access token for the user to automatically log in.
        const token = AuthHelper.generateAccessToken(userObj.id, '1d');

        return res.status(200).send({
            fullName: userObj.fullName,
            email: userObj.email,
            id: userObj.id,
            token: token
        });

    }catch(e){
        console.error(e);
        if(e.errors) {
            e.errors.forEach(err => {
                if (err['validatorKey'] === 'not_unique') {
                    return res.status(409).send(ErrorHelper.USER_EXISTS);
                }
            });
        }

        return res.status(400).send(ErrorHelper.GENERAL);
    }
}

const googleLogin = async (req, res) => {

    try{

        await verify(req.body.token).then(async googleUser =>{

            let user = await models.user.findOne({
                where:{
                    email: googleUser.email.toLowerCase(),
                }
            });

            if(!user){
                // register user
                const userObj = {
                    id: uuid(),
                    fullName: googleUser.given_name + ' ' + googleUser.family_name,
                    email: googleUser.email.toLowerCase(),
                    googleLogin: true
                }

                user = await models.user.create(userObj);
            }

            // if user has password access, he can't login using google.
            if(!user.googleLogin) return res.status(403).send(ErrorHelper.GOOGLE_LOGIN_NOT_SUPPORTED);


            const token = AuthHelper.generateAccessToken(user.id, '1d');

            return res.status(200).send({
                fullName: user.fullName,
                email: user.email,
                id: user.id,
                token: token
            });

        }).catch(e=>{
            console.log(e);
        })
    }catch(e){

    }

}

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    return payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}
module.exports = {
    login,
    register,
    googleLogin
}