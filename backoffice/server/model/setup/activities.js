//TODO: consider mass import from existing data
Meteor.startup(function() {


    if(!Meteor.settings.development.generateFakeActivities) {
        console.log("WARNING: fake activities generation aborted");
        return;
    }

    var locations = Locations.find().fetch();
	Activities.remove({});

	if (Activities.find().count() === 0) {
		var activities = [{
			name: 'import',
			description: 'import',
			startsAtDay: new Date(),
			endsAtDay: new Date(),
			startsAtTime: new Date(),
			endsAtTime: new Date(),
			location: 'reference to locations',
			phase: 'reference to phases?', // 1,2,3, assunto
			phaseParticipants: [],
		}, ];

		activities.forEach(function(activity) {
			Activities.insert(activity);
		});

		console.log('added', Activities.find().count(), 'activities.');
	}
});