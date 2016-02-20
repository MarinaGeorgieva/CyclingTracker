var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = {
		tapTrack: function() {
			frameModule.topmost().navigate("views/track-tour-page/track-tour-page");
		},
		tapProfile: function() {
			frameModule.topmost().navigate("views/my-profile-page/my-profile-page");
		}
	};
}

exports.pageLoaded = pageLoaded;