
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require('dotenv').config();
/**
 * This api is used to verify token for each request,
 * when client requests with a token, this API decodes that match with existing token  and send with 
 * decoded object.
 * We set currUser i.e. current user to req object so we can access somewhere else.
 * 
 */
 
const verifyToken=function (req, res,next) {

	const token = req.body.token || req.query.token || req.headers['token'];
	 if (token) {
		// verify secret and checks exp
		jwt.verify(token, process.env.TOKEN_SECRET, function (err, currUser) {
			if (err) {
				res.send(err);
			} else {
				// decoded object
				req.currUser = currUser;
				next();
			}
		});
	}
	 else {

		res.status(401).send("Invalid Access");
	}
};
module.exports=verifyToken;