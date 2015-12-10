Tasks    = new Mongo.Collection("tasks");
MockData = new Mongo.Collection("mockdata");
Messages = new Mongo.Collection("messages");

var serviceUUIDs =  [ '713d0000503e4c75ba943148f18d941e' ]
var charUUIDs = [ '713d0002503e4c75ba943148f18d941e', '713d0003503e4c75ba943148f18d941e', '713d0004503e4c75ba943148f18d941e' ]
var notifyChar = null;
var writeChar = null;

// implicit
// if (Meteor.isServer) {
Meteor.startup(function () {
  // code to run on server at startup

  var noble = Meteor.npmRequire('noble');
  noble.on('stateChange', state => {
  	console.log(state);
  	if (state == 'poweredOn') {
  		noble.startScanning();
  	}
  });

  noble.on('discover', peripheral => {
  	var name = peripheral.advertisement.localName;
  	console.log(peripheral);
  	if(name === 'TXRX'){
  		noble.stopScanning();
  		connectDevice(peripheral, name);
  		/*var now = new Date();
  		while(new Date().getTime() < now+1000){
  			// do nothing, l0l
  		}*/
  	}
  });
});

var requestData = function(){
	writeChar.write(new Buffer([0x01]));
}

function convertTimestamp(t, start, end) {
  var newT = 0;
  for (var i = start; i < end; i++) {
    newT = (newT << 8) + t[i];
  }
  return newT;
}

var onServiceDiscovery = Meteor.bindEnvironment(function(error, services, chars){
	if(error){
		console.log('error discovering services');
	} else {
		console.log('discovered services');
		notifyChar = chars[2];
		writeChar = chars[0];

    var dataHandler = function(data, isNotif) {
			if (isNotif) {
				console.log('data from device : ', data, data.length);
        if (data.length === 8) {
          // timestamp
          firstTime = (new Date()).getTime();
          readTimestamp = convertTimestamp(data, 0, 8);
          return;
        }

        var timestamp = firstTime - (readTimestamp - convertTimestamp(data, 0,8));
        timestamp = timestamp / 1000;
        var data1 = data[9];
        var data2 = data[11];
        var data3 = data[13];
        var data4 = data[15];
        var data5 = data[17];
        var data6 = data[19];

        console.log('putting into mockdata', {
          timestamp,
          data1,
          data2,
          data3,
          data4,
          data5,
          data6,
          createdAt: new Date(),
        });
        MockData.insert({
          timestamp,
          data1,
          data2,
          data3,
          data4,
          data5,
          data6,
          createdAt: new Date(),
        });
			}
    }

    var readTimestamp = 0;
    var firstTime = 0;
		notifyChar.on('read', Meteor.bindEnvironment(dataHandler));
		notifyChar.notify(true, function(err){
			if(err){
				console.log('error enabling notifications', err);
			} else {
				console.log('enabled notifications');
				writeChar.write(new Buffer([0x02]));
				requestData();
				setInterval(requestData, 500);
			}
		});
	}
});

var connectDevice = function(peripheral, name) {
	peripheral.connect(function(error){
		if(error){
			console.log('error connecting to ',name, error);
			//connectDevice(peripheral, name);
		} else {
			//peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, charUUIDs, onServiceDiscovery);
		}
		console.log('discoveringgggg');
		peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, charUUIDs, onServiceDiscovery);
		//peripheral.discoverServices();
	});
}
