var UserToursViewModel = require("./../../view-models/user-tours-view-model");
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');
var Toast = require("nativescript-toast");
var camera = require("camera");

var topmost;

var userId = '';

var tours = new UserToursViewModel([]);
var model = new Observable({
	tours: tours,
	username: '',
	fullName: '',
	profilePictureUrl: '~/images/default-avatar.png'
});

var userPic = '';

function pageLoaded(args) {
	var page = args.object;
	userPic = page.getViewById('profileImage');
	
	page.bindingContext = model;

	userPic.on('longPress', function(args){
		updateProfilePhoto();
	});

	topmost = frameModule.topmost();

	userId = appSettings.getString('userId');
	console.log('+++++++++++++' + userId + '+++++++++++++');

	el.Users.getById(userId)
		.then(function(data) {
				model.username = data.result.Username;
				model.fullName = data.result.DisplayName;
				if (profilePictureUrl) {
					model.profilePictureUrl = data.result.profilePictureUrl;
				}
				// console.log(model.username);
				// console.log(model.fullName);
				//alert(JSON.stringify(data));
			},
			function(error) {
				alert(JSON.stringify(error.message));
			});

	tours.load();
}

function tapTrack() {
	topmost.navigate("views/track-tour/track-tour-page");
}

function tapProfile() {
	topmost.navigate("views/profile/profile-page");
}

function tapShared() {
	topmost.navigate("views/shared/shared-tracks-page");
}


function updateProfilePhoto() {
	camera.takePicture(false).then(function(picture) {
		
		userPic.imageSource = picture;

		var convertedImage = userPic.imageSource.toBase64String('.jpg', 100);

		file = {
			Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
			ContentType: "image/jpeg",
			base64: convertedImage
		};
		el.Files.create(file, function(response) {
			console.log("Successfully uploaded the image file at: " + response.result.Uri);

			el.Users.updateSingle({ 'Id': userId, 'profilePictureUrl': response.result.Uri },
		    function(data){
		        //alert(JSON.stringify(data));
				Toast.makeText("Successfully updated profile picture!").show();
		    },
		    function(error){
		        alert(JSON.stringify(error));
				// Toast.makeText("Unable to updated profile picture!").show();
				// Toast.makeText("Check connection!").show();
		    });


		}, function(err) {
			console.log("Unfortunately the upload failed: " + err.message);
		});

	});
}

exports.tapShared = tapShared;
exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;