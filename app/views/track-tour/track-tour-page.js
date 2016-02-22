var geolocation = require("nativescript-geolocation");
var frameModule = require("ui/frame");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var timer = require("timer");
var appSettings = require('application-settings');
var camera = require("camera");
var imageSource = require("image-source");
var Everlive = require('./../../libs/everlive/everlive.all.min');
var el = new Everlive('nh2gqgfwwjk2l3nj');

var btnSave = '';
var btnShare = '';

var btnStart = '';
var btnStop = '';

var trackObj = {};

var myImage = '';
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
			if (!this._distance) {
				this._distance = 0;
			}
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
			if (!this._speed) {
				this._speed = 0;
			}
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
			if (!this._time) {
				this._time = "00:00:00";
			}
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

	return ViewModel;
})(observable.Observable);

exports.ViewModel = ViewModel;

var page;
var model = new ViewModel();

function enableLocation() {
	if (!geolocation.isEnabled()) {
		geolocation.enableLocationRequest();
	}
}

function getCurrentLocation() {
	enableLocation();
	var location = geolocation.getCurrentLocation({
		desiredAccuracy: 3,
		updateDistance: 10,
		maximumAge: 20000,
		timeout: 10000
	}).
	then(function(loc) {
		if (loc) {
			model.locations.push(loc);
		}
	}, function(e) {
		console.log("Error: " + e.message);
	});
}

function getDistance(loc1, loc2) {
	return geolocation.distance(loc1, loc2);
}

var seconds = 0,
	minutes = 0,
	hours = 0;

var elapsedSeconds,
	elapsedMinutes,
	elapsedHours;

function getElapsedTime() {
	seconds++;
	if (seconds == 60) {
		minutes = minutes + 1;
		seconds = 0;
	} else {
		minutes = minutes;
	}

	if (minutes == 60) {
		hours += 1;
		minutes = 0;
	}

	if (seconds <= 9) {
		elapsedSeconds = "0" + seconds;
	} else {
		elapsedSeconds = seconds;
	}

	if (minutes <= 9) {
		elapsedMinutes = "0" + minutes;
	} else {
		elapsedMinutes = minutes;
	}

	if (hours <= 9) {
		elapsedHours = "0" + hours;
	} else {
		elapsedHours = hours;
	}

	model.set("time", elapsedHours + ':' + elapsedMinutes + ':' + elapsedSeconds);
}

var id;

function startTimer() {
	id = timer.setInterval(function() {
		getElapsedTime()
	}, 1000);
}

function stopTimer() {
	timer.clearInterval(id);
	seconds = 0;
	minutes = 0;
	hours = 0;
	model.set("time", elapsedHours + ':' + elapsedMinutes + ':' + elapsedSeconds);
}

var watchId;

function buttonStartTap(agrs) {

	appSettings.setBoolean(global.isTracking, true);

	btnStop.scaleX = 0;
	btnStop.scaleY = 0;

	btnStart.animate({
                scale: { x: 0, y: 0 },
                duration: 300
            })
            .then(function () {
                return btnStart.visibility = "collapsed";
            })
            .then(function () {
                return btnStop.visibility = "visible";
            })
            .then(function () {
                return btnStop.animate({
                scale: { x: 1, y: 1 },
                duration: 300
            })
        });

	startTimer();

	getCurrentLocation();

	watchId = geolocation.watchLocation(
		function(loc) {
			if (loc) {
				model.locations.push(loc);
				var currentDistance = getDistance(model.locations.getItem(model.locations.length - 2), model.locations.getItem(model.locations.length - 1)) | 0;
				model.set("speed", model.locations.getItem(model.locations.length - 1).speed);
				model.set("distance", model.distance + currentDistance);
			}
		},
		function(e) {
			console.log("Error: " + e.message);
		}, {
			desiredAccuracy: 3,
			updateDistance: 1,
			updateTime: 1000 * 5
		});
	console.log("buttonStartTap");
}

function buttonStopTap(agrs) {
	stopTimer();

	console.log("button stop tap");

	appSettings.setBoolean(global.isTracking, false);
	
	btnStart.scaleX = 0;
	btnStart.scaleY = 0;

	btnStop.animate({
                scale: { x: 0, y: 0 },
                duration: 300
            })
            .then(function () {
                return btnStop.visibility = "collapsed";
            })
            .then(function () {
                return btnStart.visibility = "visible";
            })
            .then(function () {
                return btnStart.animate({
                scale: { x: 1, y: 1 },
                duration: 300
            })
            .then(takePicture())
        });

	if (watchId) {
		geolocation.clearWatch(watchId);
	}

	//create track object
	trackObj.userId = appSettings.getString("userId");
	console.log(trackObj.userId);
	console.log(trackObj.trackPictureUrl);
}

function pageLoaded(args) {
	page = args.object;
	page.bindingContext = model;

	myImage = page.getViewById("myImg");

	btnStart = page.getViewById("btnStart");
	btnStop = page.getViewById("btnStop");

	btnSave = page.getViewById("btnSave");
	btnShare = page.getViewById("btnShare");
	btnSave.visibility = "collapsed";
	btnShare.visibility = "collapsed";

	if (appSettings.getBoolean(global.isTracking)) {
		btnStart.visibility = "collapsed";
		btnStop.visibility = "visible";
	}else {
		btnStart.visibility = "visible";
		btnStop.visibility = "collapsed";		
	}

	topmost = frameModule.topmost();
}

function saveTrack() {
	console.log("---------save---------");
	trackObj.isPublic = false;
	uploadTrack(trackObj);
}

function shareTrack() {
	console.log("---------share---------");
	trackObj.isPublic = true;
	uploadTrack(trackObj);
}

function takePicture() {
	camera.takePicture().then(function(picture) {
		myImage.imageSource = picture;
		myImage.scaleX = 0.9;
		myImage.scaleY = 0.9;
		var convertedImage = myImage.imageSource.toBase64String('.jpg', 100);

		
		var file = {
			Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
			ContentType: "image/jpeg",
			base64: convertedImage
		};

		// UPLOAD FILE TO BACKEND SERVICE AND GET FILE ID
		el.Files.create(file, function(response) {
			trackObj.trackPictureUrl = response.result.Uri;
			trackObj.Id = response.result.Id;
			
			btnSave.visibility = "visible";
			btnSave.scaleX = 0;			
			btnSave.scaleY = 0;			
			btnSave.animate({
                scale: { x: 1.3, y: 1.3 },
                duration: 300
            })
            .then(function(){
            	return btnSave.animate({
                	scale: { x: 1, y: 1 },
               		duration: 100
            	})
            });

			btnShare.visibility = "visible";
			btnShare.scaleX = 0;			
			btnShare.scaleY = 0;			
			btnShare.animate({
                scale: { x: 1.3, y: 1.3 },
                duration: 300
            })
            .then(function(){
            	return btnShare.animate({
                	scale: { x: 1, y: 1 },
               		duration: 100
            	})
            });

			console.log("Successfully uploaded the image file at: " + response.result.Uri);
		}, function(err) {
			console.log("Unfortunately the upload failed: " + err.message);
		});

	});
}

function uploadTrack(trackObj) {
	var data = el.data('track');
	data.create(trackObj, function(data) {
		frameModule.topmost().navigate("views/home/home-page");
	}, function(error) {
		console.log('ERROR ' + JSON.stringify(error)); // error
	});
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

exports.buttonStartTap = buttonStartTap;
exports.buttonStopTap = buttonStopTap;

exports.onLoaded = pageLoaded;

exports.saveTrack = saveTrack;
exports.shareTrack = shareTrack;