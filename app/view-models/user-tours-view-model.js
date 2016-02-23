var frameModule = require("ui/frame");
var Everlive = require('../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require('application-settings');
var moment = require('moment');

function UserToursViewModel(items) {
	var viewModel = new ObservableArray(items);

	viewModel.load = function() {
		var userId = appSettings.getString("userId");
		console.log(userId);

		var data = el.data('track');
		var query = new Everlive.Query();

		query.where()
			.eq('userId', userId)
			.done()
			.select('trackPictureUrl', 'distance', 'name', 'CreatedAt')
			.order('CreatedAt');

		data.get(query)
			.then(function(data) {
				viewModel.empty();
				data.result.forEach(function(tour) {
					viewModel.push({
						createdAt: moment(tour.CreatedAt).format('D/M/YY'),
						distance: tour.distance,
						trackPictureUrl: tour.trackPictureUrl,
						name: tour.name
					});
				})
			}, function(error) {
				alert(JSON.stringify(error.message));
			});
	};

	viewModel.empty = function() {
		while (viewModel.length) {
			viewModel.pop();
		}
	};

	return viewModel;
}

module.exports = UserToursViewModel;