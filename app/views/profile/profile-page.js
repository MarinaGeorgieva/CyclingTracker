var ProfileViewModel = require("./../../view-models/profile-view-model");
var frameModule = require("ui/frame");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');

var topmost;
var myTracks = [];

var profile = new ProfileViewModel({
	username: "",
	fullName: "",
	pictureUrl: "",
	tours: []
});

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = profile;

	topmost = frameModule.topmost();

	profile.load();
	//myTracks = getMyTracks();
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

function getMyTracks() {

	var userId = appSettings.getString(global.userId);

	var data = el.data('track');
	var query = new Everlive.Query();

	query.where()
		.eq('userId', userId)
		.done()
		.select('userFullName', 'distance', 'trackPictureUrl', 'Created at')
		.orderDesc('Created at')
		.take(1);

	data.get(query)
		.then(function(data) {
			console.log("-------------------success---------------");
			console.log(JSON.stringify(data.result));
			return data.result;
		}, function(error) {
			console.log(JSON.stringify(error));
		});
}

exports.tapShared = tapShared;
exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;