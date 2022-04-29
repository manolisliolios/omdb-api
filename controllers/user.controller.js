import ErrorHelper from "../helpers/error.helper"
import {uuid} from "uuidv4"
import AuthHelper from "../helpers/auth.helper";
import models from "../models";

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

        // verify that passwords are the same.
        const isSamePassword = await AuthHelper.isSamePassword(req.body.password, user.password);
        if(!isSamePassword) return res.status(403).send(ErrorHelper.INVALID_CREDENTIALS);

        const token = AuthHelper.generateAccessToken(user.id, '1d');

        return res.status(200).send({
            token: token
        });



    }catch(e){
        console.error(e);
        return res.status(400).send(ErrorHelper.GENERAL);
    }
};


const register = async ( req, res) => {

    if(!req.body.email || !req.body.password || !req.body.fullName){
        return res.status(400).send(ErrorHelper.INVALID_REGISTRATION_FIELDS);
    }

    try{

        const user = {
            id: uuid(),
            fullName: req.body.fullName,
            email: req.body.email.toLowerCase()
        }

        // hash user's password before inserting into db
        user.password = AuthHelper.hashPassword(req.body.password);

        const userObj = await models.user.create(user);

        const token = AuthHelper.generateAccessToken(userObj.id, '1d');


        return res.status(200).send({
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

module.exports = {
    login,
    register
}