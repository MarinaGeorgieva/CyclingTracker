var frameModule = require("ui/frame");
var Everlive = require('../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var Observable = require("data/observable").Observable;
//var validator = require("email-validator");

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

		return el.Users.register(viewModel.get("username"),
			viewModel.get("password"),
			attrs,
			function(data) {
				alert(JSON.stringify(data));
			},
			function(error) {
				alert(JSON.stringify(error));
			});
	};

	return viewModel;
}

module.exports = User;