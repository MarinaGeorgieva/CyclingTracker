var frameModule = require("ui/frame");
var Everlive = require('../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');
var ObservableArray = require("data/observable-array").ObservableArray;

function SharedToursViewModel(items) {
	var viewModel = new ObservableArray(items);

	viewModel.load = function() {
		var data = el.data('track');
		var query = new Everlive.Query();

		query.where()
			.eq('isPublic', true)
			.done()
			.select('userId', 'distance', 'trackPictureUrl')
			.orderDesc('Created-at')
			.take(1);

		data.get(query)
			.then(function(data) {
				console.log("-------------------success---------------");
				console.log(JSON.stringify(data.result));
				data.result.forEach(function(tour) {
						console.log(tour);
						viewModel.push({
							userId: tour.userId,
							distance: tour.distance,
							trackPictureUrl: tour.trackPictureUrl
						});
					})
					//return data.result;
			}, function(error) {
				console.log(JSON.stringify(error));
			});
	};

	return viewModel;
}

module.exports = SharedToursViewModel;