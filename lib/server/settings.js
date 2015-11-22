Meteor.startup(function() {
	var settingsFile = 'settings.json';
	try {
		settings="local/" + settingsFile
		Meteor.settings = JSON.parse(Assets.getText(settings));
		console.log("Meteor.settings: using ", settings);
		console.log("Meteor.settings:", JSON.stringify(Meteor.settings, null, 2));
	} catch (e) {
		try {
			settings=settingsFile
			Meteor.settings = JSON.parse(Assets.getText(settings));
			console.log("Meteor.settings: using ", settings);
			console.log("Meteor.settings:", JSON.stringify(Meteor.settings, null, 2));
		} catch (e) {
			console.log("WARNING: %s not loaded.", settings);
			console.log("WARNING: aborting Meteor.settings init");
			console.log("WARNING: error message:", e);
		}
	}
});
