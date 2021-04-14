const express = require("express");
const mysql   = require("mysql");
const bodyParser  = require("body-parser");


const verifyToken = require('./middleware/verifyToken');
const addNewUser = require('./middleware/addNewUser');
const userLoginCheck = require('./middleware/userLoginCheck');
const findAllUsers = require('./middleware/findAllUsers'); 
const welcome = require('./middleware/welcome');
const validateFields = require('./middleware/validateFields');

const port = process.env.PORT || 9000;


const app  = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

app.post('/signup',validateFields,addNewUser);
app.post('/userlogin', userLoginCheck);




const apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());

//route middleware to verify a token 
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
apiRoutes.get('/users', findAllUsers);

app.use('/api', apiRoutes);

