let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: 'INVALID_TOKEN'
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            error: 'MISSING_TOKEN'
        });
    }
};

export default checkToken;