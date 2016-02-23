var application = require("application");

global.userId = 'userId';
global.totalDistance = 0;
global.isTracking = "isTracking";

application.mainModule = "views/login/login-page";
application.cssFile = "./styles/app.css";


application.start();