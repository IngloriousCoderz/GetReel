//TODO: consider mass import from existing data
Meteor.startup(function() {


    if (Meteor.settings.development.generateFakeEvents) {
		var maxApplications = Meteor.settings.development.generateFakeEvents.maxApplications;
		var maxEvents = Meteor.settings.development.generateFakeEvents.maxEvents;
		console.log('regenerating max %d fake events for %d applications...', maxEvents, maxApplications);
	} else {
		var maxEvents = 0;
		console.log('WARNING : NOT regenerating fake activities');
		return;
	}

    var applicationsPhase2 = Applications.find({"phases.current.phase":2}, {limit:maxApplications});
    var applicationsPhase3 = Applications.find({"phases.current.phase":3}, {limit:maxApplications});

    // var locations = Locations.find().fetch();
	Events.remove({});

	if (Events.find().count() === 0) {
        var event = {};

        for(e=0; e < maxEvents; e++) {
            event = {
                name: 'import',
                description: 'import',
                startsAtDay: new Date(),
                endsAtDay: new Date(),
                startsAtTime: new Date(),
                endsAtTime: new Date(),
                location: randomCollectionElement(Locations).name,
                phase2: [],
                phase3: [],
            }
            applicationsPhase2.forEach(function(application) {
                event.phase2.push(application._id);
            });


            applicationsPhase3.forEach(function(application) {
                event.phase3.push(application._id);
            });
            //
            // se serve assegnare a random un evento ad una application
            // e' necessario prima salvare l'evento per avere l'id
            //
            event._id = Events.insert(event);
            Applications.update({"phases.current.phase":2}, {$push: {events:event._id}}, {multi:true});
            Applications.update({"phases.current.phase":3}, {$push: {events:event._id}}, {multi:true});
        }


		console.log('added', Events.find().count(), 'activities.');
	}
});