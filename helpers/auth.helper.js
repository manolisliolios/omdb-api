import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHelper from "./error.helper"
/*
    Generate a JWT access token and crypt userid in it
 */
const generateAccessToken = (id, expiresIn) => {
    return jwt.sign({userId: id}, process.env.AUTH_SECRET, {expiresIn: expiresIn});
};

/*
    Decodes a token and returns it's payload
 */

const decodeToken = async (hash) => {
    return jwt.verify(hash, process.env.AUTH_SECRET);
}

/*
    Hash password with 10 salt round, generate a bcrypt image.
 */
const hashPassword = async (password) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
};

/*
    Compares two passwords using bcrypt.
 */

const isSamePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};


const verifyToken = async (req, res, next) => {

    let decoded;

    // get access token from request header
    const token = req.headers['x-access-token'];
    // if no token, return error
    if(!token) return res.status(401).send(ErrorHelper.NO_TOKEN);

    try {
        decoded = await jwt.verify(token, process.env.AUTH_SECRET);

    } catch(e) {

        // if token is expired, return appropriate message to disconnect in frontend

        if(e.name === 'TokenExpiredError'){
            return res.status(401).send(ErrorHelper.TOKEN_EXPIRED);
        }
        return res.status(401).send(ErrorHelper.NO_TOKEN);
    }

    req.user = {id: decoded.userId}
    next();
}

module.exports = {
    generateAccessToken,
    decodeToken,
    hashPassword,
    isSamePassword,
    verifyToken
}