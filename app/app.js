var application = require("application");

global.profileCreated = 'profileCreated';
global.userId = 'userId';

application.mainModule = "login-page";
application.cssFile = "./app.css";
application.start();
