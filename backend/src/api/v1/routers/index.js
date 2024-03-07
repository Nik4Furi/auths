const Routers = require('express').Router();


//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser'); //fetch user by the token

//------------------ Controllers Specific Stuff-------------------------X
const AuthController = require('../controllers/UsersControllers');


//----------------------- INitizlalzing auth apis's routes here -------------------X
Routers.post('/register', AuthController().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/login', AuthController().Login); //login the users ,using POST '/api/user/login'
Routers.get('/getUser', FetchUser, AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'
Routers.get('/allUsers', FetchUser, AuthController().FetchAllUsers); //get info of login users ,using GET '/api/user/getUser'

module.exports = Routers