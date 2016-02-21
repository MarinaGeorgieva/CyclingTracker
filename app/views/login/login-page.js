var frameModule = require("ui/frame");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');
var textView = require("ui/text-view");
var observable = require("data/observable");
var Toast = require("nativescript-toast");
var camera = require("camera");
var imageSource = require("image-source");
var fileUri = '';

function pageLoaded(args) {

	//check if first time

	if (appSettings.getBoolean(global.profileCreated, false)) {
		frameModule.topmost().navigate("views/home/home-page");
	};

	var page = args.object;
	var myImage = page.getViewById("myImg");
	var user = {};


	page.bindingContext = {
		tapLogin: function() {

			console.log('loginTapped');
			//frameModule.topmost().navigate("views/main-page/main-page");

			var userName = page.getViewById('loginUsernameTextView').text;
			var pass = page.getViewById('loginPassTextView').text;

			if (!userName) {
				Toast.makeText("Provide username to login!").show();
			};
			if (!pass) {
				Toast.makeText("Provide password to login!").show();
			};

			var data = el.data('userInfo');
			var query = new Everlive.Query();
			query.where()
				.eq('userName', userName)
				.done()
				.select('userName', 'password', 'Id');

			data.get(query)
				.then(function(data) {
					var currentUser = data.result[0];
					if (pass != currentUser.password) {
						Toast.makeText("Password incorrect!").show();
						return;
					} else {
						appSettings.setString(global.userId, currentUser.Id);
						appSettings.setBoolean(global.profileCreated, true);
						console.log('-------------------tuk befor------------------');
						frameModule.topmost().navigate("views/home/home-page");
						console.log('-------------------tuk after------------------');
						};

				}, function(error) {
					console.log(JSON.stringify(error));
				});

		},
		tapRegister: function() {
			user.userName = page.getViewById('usernameTextView').text;
			user.email = page.getViewById('emailTextView').text;
			user.password = page.getViewById('passwordTextView').text;
			user.confirmPassword = page.getViewById('confirmTextView').text;
			user.fullName = page.getViewById('fullNameTextView').text;
			user.profilePicUrl = fileUri;

			if (!user.userName) {
				Toast.makeText("Username field is required!").show();
				return;
			};
			if (!user.email) {
				Toast.makeText("Email field is required!").show();
				return;
			};
			if (!user.password) {
				Toast.makeText("Password field is required!").show();
				return;
			} else if (!user.confirmPassword) {
				Toast.makeText("Password conformation is required!").show();
				return;
			} else if (user.password != user.confirmPassword) {
				Toast.makeText("Password conformation not matching!").show();
				return;
			};
			if (!user.fullName) {
				Toast.makeText("Full name field is required!").show();
				return;
			};

			if (!user.profilePicUrl) {
				Toast.makeText("Please take profile picture first!").show();
				return;
			};

			var data = el.data('userInfo');
			data.create(user, function(data) {
				appSettings.setString(global.userId, data.result.Id);
				appSettings.setBoolean(global.profileCreated, true);
				frameModule.topmost().navigate("views/home/home-page");
			}, function(error) {
				console.log('ERROR ' + JSON.stringify(error)); // error

			});
		},
		takeAvatarTapped: function() {
			console.log('take photo tapped');

			camera.takePicture().then(function(picture) {
				myImage.imageSource = picture;

				var convertedImage = myImage.imageSource.toBase64String('.jpg', 100);

				var file = {
					Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
					ContentType: "image/jpeg",
					base64: convertedImage
				};

				// // UPLOAD FILE TO BACKEND SERVICE AND GET FILE ID
				el.Files.create(file, function(response) {
					fileUri = response.result.Uri;
					user.profilePicUrl = fileUri;

					console.log("Successfully uploaded the image file at: " + response.result.Uri);
				}, function(err) {
					console.log("Unfortunately the upload failed: " + err.message);
				});
			});
		}
	};
}

exports.pageLoaded = pageLoaded;