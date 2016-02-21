var frameModule = require("ui/frame");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var UserViewModel = require("./../../view-models/user-view-model");
var Toast = require("nativescript-toast");

var user = new UserViewModel({
	username: "",
	password: "",
	confirmPassword: "",
	email: "",
	displayName: ""
});

var username,
	password,
	confirmPassword,
	email,
	fullName;

function onLoaded(args) {
	var page = args.object;
	page.bindingContext = user;

	username = page.getViewById("usernameTextField").text;
	password = page.getViewById("passwordTextField").text;
	confirmPassword = page.getViewById("confirmPasswordTextField").text;
	email = page.getViewById("emailTextField").text;
	fullName = page.getViewById("fullNameTextField").text;
}

function tapRegister() {
	console.log("----------------Register----------------")

	//TODO: Validate fields !!!!!

	user.register();
}

exports.tapRegister = tapRegister;
exports.onLoaded = onLoaded;