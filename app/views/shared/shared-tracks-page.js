var SharedToursViewModel = require("./../../view-models/shared-tours-view-model");
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');

var topmost;

// var myTracks = [];

var tours = new SharedToursViewModel([]);
var model = new Observable({
	tours: tours
});

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	topmost = frameModule.topmost();

	tours.load();
	//myTracks = getSharedTracks();
}

/*
function getSharedTracks() {
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
*/

function tapTrack() {
	topmost.navigate("views/track-tour/track-tour-page");
}

function tapProfile() {
	topmost.navigate("views/profile/profile-page");
}

function tapShared() {
	topmost.navigate("views/shared/shared-tracks-page");
}

exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.tapShared = tapShared;
exports.pageLoaded = pageLoaded;