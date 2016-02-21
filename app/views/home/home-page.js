//var vmModule = require("../home/home-view-model");
var frameModule = require("ui/frame");
//var fs = require("file-system");
var observable = require("data/observable");
var geolocation = require("nativescript-geolocation");

var topmost;

function pageLoaded(args) {
	var page = args.object;
	topmost = frameModule.topmost();
}
/*
var location;

function getLocation() {
	var location = geolocation.getCurrentLocation({
		desiredAccuracy: 3,
		updateDistance: 10,
		maximumAge: 20000,
		timeout: 20000
	}).
	then(function(loc) {
		if (loc) {
			location = loc;

			var trackTourPageModel = new observable.Observable({
				location: location
			});

			topmost.navigate({
				moduleName: "views/track-tour/track-tour-page",
				context: trackTourPageModel
			});
		}
	}, function(e) {
		console.log("Error: " + e.message);
	});
}

function isLocationEnabled() {
	if (!geolocation.isEnabled()) {
		geolocation.enableLocationRequest();
	}
}
*/
function tapTrack() {
	//isLocationEnabled();
	//getLocation();
	topmost.navigate("views/track-tour/track-tour-page");
}

function tapProfile() {
	topmost.navigate("views/profile/profile-page");
}

exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;