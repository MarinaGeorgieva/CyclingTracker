var application = require("application");

global.profileCreated = 'profileCreated';
global.userId = 'userId';

application.mainModule = "views/login/login-page";
application.cssFile = "./styles/app.css";

application.start();