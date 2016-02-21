var frameModule = require("ui/frame");

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

exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;