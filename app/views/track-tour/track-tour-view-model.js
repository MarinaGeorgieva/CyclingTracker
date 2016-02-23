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

	Object.defineProperty(ViewModel.prototype, "distance", {
		get: function() {
			// if (!this._distance) {
			// 	this._distance = 0;
			// }
			return this._distance;
		},
		set: function(value) {
			if (this._distance !== value) {
				this._distance = value;
				this.notifyPropertyChange("distance", value);
			}
		},
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(ViewModel.prototype, "speed", {
		get: function() {
			// if (!this._speed) {
			// 	this._speed = 0;
			// }
			return this._speed;
		},
		set: function(value) {
			if (this._speed !== value) {
				this._speed = value;
				this.notifyPropertyChange("speed", value);
			}
		},
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(ViewModel.prototype, "time", {
		get: function() {
			// if (!this._time) {
			// 	this._time = "00:00:00";
			// }
			return this._time;
		},
		set: function(value) {
			if (this._time !== value) {
				this._time = value;
				this.notifyPropertyChange("time", value);
			}
		},
		enumerable: true,
		configurable: true
	});

	Object.defineProperty(ViewModel.prototype, "name", {
		get: function() {
			// if (!this._name) {
			// 	this._name = "";
			// }
			return this._name;
		},
		set: function(value) {
			if (this._name !== value) {
				this._name = value;
				this.notifyPropertyChange("name", value);
			}
		},
		enumerable: true,
		configurable: true
	});

	return ViewModel;
})(observable.Observable);

exports.ViewModel = ViewModel;