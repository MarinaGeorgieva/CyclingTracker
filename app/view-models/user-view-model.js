var frameModule = require("ui/frame");
var Everlive = require('../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var Observable = require("data/observable").Observable;
var Toast = require("nativescript-toast");
var appSettings = require('application-settings');

function User(info) {
	info = info || {};

	var viewModel = new Observable({
		username: info.username || "",
		password: info.password || ""
	});

	viewModel.login = function() {
		el.authentication.login(viewModel.get("username"),
			viewModel.get("password"),
			function(data) {
				Toast.makeText("Successfully logged in!").show();
				var topmost = frameModule.topmost();
				topmost.navigate("views/home/home-page");
			},
			function(error) {
				alert(JSON.stringify(error.message));
			});
	};

	viewModel.register = function() {
		var attrs = {
			Email: viewModel.get("email"),
			DisplayName: viewModel.get("displayName")
		};

		if (viewModel.get("password") !== viewModel.get("confirmPassword")) {
			alert("Password and confirm password don't match!");
		}

		el.Users.register(viewModel.get("username"),
			viewModel.get("password"),
			attrs,
			function(data) {
				Toast.makeText("Successfully registered!").show();
				var topmost = frameModule.topmost();
				topmost.navigate("views/login/login-page");
			},
			function(error) {
				alert(JSON.stringify(error));
			});
	};

	return viewModel;
}

module.exports = User;