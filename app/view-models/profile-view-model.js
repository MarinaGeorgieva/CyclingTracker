var frameModule = require("ui/frame");
var Everlive = require('../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require('application-settings');

function ProfileViewModel(info) {
	info = info || {};

	var viewModel = new Observable({
		username: info.name || "",
		fullName: info.fullName || "",
		pictureUrl: info.pictureUrl || "",
		tours: new ObservableArray(info.tours) || new ObservableArray([])
	});

	viewModel.load = function() {
		var userId = appSettings.getString("userId");

		console.log(userId);

		var data = el.data('track');
		var query = new Everlive.Query();

		// Doesn't work :( 
		query.where()
			.equal('userId', userId)
			.done()
			.select('trackPictureUrl', 'distance')
			.order('distance')
			.take(1);

		data.get(query)
			.then(function(data) {
				console.log("-------------------success---------------");
				console.log(JSON.stringify(data.result));
			}, function(error) {
				alert(JSON.stringify(error));
			});
	};

	return viewModel;
}

module.exports = ProfileViewModel;