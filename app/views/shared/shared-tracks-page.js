var frameModule = require("ui/frame");
var observable = require("data/observable");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');

var topmost;

var myTracks = [];

function pageLoaded(args) {
	var page = args.object;
	topmost = frameModule.topmost();
	myTracks = getSharedTracks();
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

function getSharedTracks(){
	var data = el.data('track');
	var query = new Everlive.Query();
	
	query.where()
		.eq('isPublic', true)
		.done()
		.select('userFullName', 'distance', 'trackPictureUrl')
//		.orderDesc('Created-at')
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


exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.tapShared = tapShared;
exports.pageLoaded = pageLoaded;