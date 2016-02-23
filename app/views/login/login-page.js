var frameModule = require("ui/frame");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var UserViewModel = require("./../../view-models/user-view-model");
var Toast = require("nativescript-toast");
var appSettings = require('application-settings');

var user = new UserViewModel({
	username: "",
	password: ""
});

var topmost,
	username,
	password;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = user;

	topmost = frameModule.topmost();

	username = page.getViewById("usernameTextField").text;
	password = page.getViewById("passwordTextField").text;

	// If user is already logged in
	var currentUserId = appSettings.getString("userId");
	if (currentUserId) {
		topmost.navigate("views/home/home-page");
	}
}

function tapLogin() {
	console.log("----------------Login----------------");
	user.login();
}

function goToRegister() {
	var navigationEntry = {
		moduleName: "views/register/register-page",
		animated: true,
		transition: {
			name: "flip",
			duration: 600,
			curve: "easeIn"
		}
	};
	topmost.navigate(navigationEntry);
}

exports.tapLogin = tapLogin;
exports.goToRegister = goToRegister;
exports.pageLoaded = pageLoaded;