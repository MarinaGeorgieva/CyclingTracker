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
	el.Users.currentUser()
		.then(function(data) {
				console.log("User is logged in!");
				topmost.navigate("views/home/home-page");
				//alert(JSON.stringify(data));
			},
			function(error) {
				console.log("No user!");
				//alert(JSON.stringify(error));
			});
}

function tapLogin() {
	console.log("----------------Login----------------")

	/*
	if (!username) {
		Toast.makeText("Provide username to login!").show();
	};
	if (!password) {
		Toast.makeText("Provide password to login!").show();
	};
	*/

	//TODO: Validate username and password !!!!!

	user.login();
}

function goToRegister() {
	topmost.navigate("views/register/register-page");
}

exports.tapLogin = tapLogin;
exports.goToRegister = goToRegister;
exports.pageLoaded = pageLoaded;