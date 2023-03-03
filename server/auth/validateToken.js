const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    let token;
    if (authHeader) {
        token = authHeader.split(" ")[1]; //extract the token from the headers
    } else {
        token = null;
    }
    if (token == null) return res.sendStatus(401);
    console.log("Token found");
    jwt.verify(token, process.env.SECRET, (err, user) => { //verify the validity of the token
        if (err) return res.status(401).json("Expired token, please log in again");
        req.user = user;
        next();
    });



};
