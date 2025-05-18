var jwt = require('jsonwebtoken');


// Check token is correct or Not

exports.VerifyToken = (req, res, next) => {

    let tokenKey;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        tokenKey = authHeader.split(" ")[1]
    }

    // token validation check
    if (!tokenKey) {
        return res.status(401).send({ success: false, message: "You need to login" }); // if token is not set in cookies
    }
    //message: 'Unauthorized: No token provided'
    // You are not Authenticated

    // token decoded
    jwt.verify(tokenKey, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Token is not Valid" }); // if token is wrong
            // message: 'Unauthorized: Token expired'
        }
        req.userInformation = decode;  // get decode user _id
        //console.log(req.userInformation)   //get decode user _id
        next();
    });
};