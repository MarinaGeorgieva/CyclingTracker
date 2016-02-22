var application = require("application");

global.userId = 'userId';

application.mainModule = "views/login/login-page";
application.cssFile = "./styles/app.css";

application.start();