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
    return jwt.verify(hash, process.env.SECRET);
}



module.exports = {
    generateAccessToken
}