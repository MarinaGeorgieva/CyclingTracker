var application = require("application");
var appSettings = require('application-settings');

global.userId = 'userId';
global.userFullName = 'full name';

application.mainModule = "views/login/login-page";
application.cssFile = "./styles/app.css";

application.start();