Meteor.startup(function() {
	var settings = Assets.getText('settings.json');
	var settingsJSON = JSON.parse(settings);
	console.log('SETTINGS', settings);
	console.log('SETTINGS-JSON', settingsJSON);
	Meteor.settings = settingsJSON;
});