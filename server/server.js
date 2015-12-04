Tasks    = new Mongo.Collection("tasks");
MockData = new Mongo.Collection("mockdata");

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

var onServiceDiscovery = function(error, services, chars){
	if(error){
		console.log('error discovering services');
	} else {
		console.log('discovered services');
		notifyChar = chars[2];
		writeChar = chars[0];
		notifyChar.on('read', function(data, isNotif){
			if(isNotif){
				console.log('data from device : ', data);
			}
		});
		notifyChar.notify(true, function(err){
			if(err){
				console.log('error enabling notifications', err);
			} else {
				console.log('enabled notifications');
				requestData();
				setInterval(requestData, 1000);
			}
		});
	}
}

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
