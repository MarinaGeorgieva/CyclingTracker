var UserToursViewModel = require("./../../view-models/user-tours-view-model");
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');

var topmost;

var tours = new UserToursViewModel([]);
var model = new Observable({
	tours: tours,
	username: '',
	fullName: '',
	profilePictureUrl: ''
});

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	topmost = frameModule.topmost();

	userId = appSettings.getString('userId');
	console.log(userId);

	el.Users.getById(userId)
		.then(function(data) {
				model.username = data.result.Username;
				model.fullName = data.result.DisplayName;
				console.log(model.username);
				console.log(model.fullName);
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

exports.tapShared = tapShared;
exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;