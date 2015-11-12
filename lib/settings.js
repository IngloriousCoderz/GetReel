Meteor.startup(function() {
	var settings = 'settings.json';
	try {
		Meteor.settings = JSON.parse(Assets.getText(settings));
		console.log("Meteor.settings:", JSON.stringify(Meteor.settings, null, 2));
	} catch (e) {
		console.log("WARNING: %s not loaded.", settings);
		console.log("WARNING: aborting Meteor.settings init");
		console.log("WARNING: error message:", e);
	}
});