var geolocation = require("nativescript-geolocation");
var frame = require("ui/frame");
var observable = require("data/observable");
var observableArray = require("data/observable-array");

var ViewModel = (function(_super) {
	__extends(ViewModel, _super);

	function ViewModel() {
		_super.apply(this, arguments);
	}
	Object.defineProperty(ViewModel.prototype, "locations", {
		get: function() {
			if (!this._locations) {
				this._locations = new observableArray.ObservableArray();
			}
			return this._locations;
		},
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(ViewModel.prototype, "status", {
		get: function() {
			return this._status;
		},
		set: function(value) {
			if (this._status !== value) {
				this._status = value;
				this.notifyPropertyChange("status", value);
			}
		},
		enumerable: true,
		configurable: true
	});
	return ViewModel;
})(observable.Observable);

exports.ViewModel = ViewModel;

var page;
var model = new ViewModel();

function pageLoaded(args) {
	page = args.object;
	page.bindingContext = model;
}

function enableLocation(args) {
	if (!geolocation.isEnabled()) {
		geolocation.enableLocationRequest();
	}
}

function getCurrentLocation(args) {
	var location = geolocation.getCurrentLocation({
		desiredAccuracy: 3,
		updateDistance: 10,
		maximumAge: 20000,
		timeout: 20000
	}).
	then(function(loc) {
		if (loc) {
			model.locations.push(loc);
		}
	}, function(e) {
		console.log("Error: " + e.message);
	});
}

var watchId;

function buttonStartTap(agrs) {
	//enableLocation();
	//getCurrentLocation();
	watchId = geolocation.watchLocation(
		function(loc) {
			if (loc) {
				model.locations.push(loc);
				console.log(loc.speed);
			}
		},
		function(e) {
			console.log("Error: " + e.message);
		}, {
			desiredAccuracy: 3,
			updateDistance: 10,
			updateTime: 1000 * 20
		}); // should update every 20 sec according to google documentation this is not so sure.
	console.log(watchId);
}

function buttonStopTap(agrs) {
	console.log(watchId);
	if (watchId) {
		geolocation.clearWatch(watchId);
	}
}

exports.onLoaded = pageLoaded;
exports.buttonStartTap = buttonStartTap;
exports.buttonStopTap = buttonStopTap;