var frameModule = require("ui/frame");
var observable = require("data/observable");

var topmost;

function pageLoaded(args) {
	var page = args.object;
	topmost = frameModule.topmost();
}

function tapTrack() {
	var navigationEntry = {
		moduleName: "views/track-tour/track-tour-page",
		animated: true,
		transition: {
			name: "slide",
			duration: 380,
			curve: "easeIn"
		}
	};
	topmost.navigate(navigationEntry);
}

function tapProfile() {
	var navigationEntry = {
		moduleName: "views/profile/profile-page",
		animated: true,
		transition: {
			name: "slide",
			duration: 380,
			curve: "easeIn"
		}
	};
	topmost.navigate(navigationEntry);
}

function tapShared() {
	var navigationEntry = {
		moduleName: "views/shared/shared-tracks-page",
		animated: true,
		transition: {
			name: "slideTop",
			duration: 380,
			curve: "easeIn"
		}
	};
	topmost.navigate(navigationEntry);
}

exports.tapShared = tapShared;
exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.pageLoaded = pageLoaded;