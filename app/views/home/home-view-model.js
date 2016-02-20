var geolocation = require("nativescript-geolocation");
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
				this._locations = new observable_array_1.ObservableArray();
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


function enableLocationTap(args) {
	//frameModule.navigate("views/track-tour-page/track-tour-page");
	var isEnabled = geolocation.isEnabled();
	console.log(isEnabled);
	if (!geolocation.isEnabled()) {
		geolocation.enableLocationRequest();
	}
}

exports.enableLocationTap = enableLocationTap;
exports.ViewModel = ViewModel;