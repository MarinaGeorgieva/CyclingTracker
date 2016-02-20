var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = {
		tapTrack: function() {
			frameModule.topmost().navigate("views/track-tour-page/track-tour-page");
		}
	};
}

exports.pageLoaded = pageLoaded;