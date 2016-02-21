var frameModule = require("ui/frame");
var observable = require("data/observable");

var topmost;

function pageLoaded(args) {
	var page = args.object;
	topmost = frameModule.topmost();
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

exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.tapShared = tapShared;
exports.pageLoaded = pageLoaded;