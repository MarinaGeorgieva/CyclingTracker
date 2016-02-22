var SharedToursViewModel = require("./../../view-models/shared-tours-view-model");
var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var appSettings = require('application-settings');

var topmost;

var tours = new SharedToursViewModel([]);
var model = new Observable({
	tours: tours
});

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

	topmost = frameModule.topmost();

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

exports.tapTrack = tapTrack;
exports.tapProfile = tapProfile;
exports.tapShared = tapShared;
exports.pageLoaded = pageLoaded;