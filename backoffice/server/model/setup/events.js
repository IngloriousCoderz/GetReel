//TODO: consider mass import from existing data
Meteor.startup(function() {


    if(!Meteor.settings.development.generateFakeEvents) {
        console.log("WARNING: fake events generation aborted");
        return;
    }

    var locations = Locations.find().fetch();
	Events.remove({});

	if (Events.find().count() === 0) {
		var events = [{
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

		events.forEach(function(event) {
			Events.insert(event);
		});

		console.log('added', Events.find().count(), 'activities.');
	}
});