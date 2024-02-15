let jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        let tokenPayload =jwt.verify(token,'tok');
        next();
    } catch {
        res.status(401).json({message : "token non valide"})
    }
}
