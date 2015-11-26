//TODO: consider mass import from existing data
Meteor.startup(function() {
  var maxEvents = 0;
  if (Meteor.settings.development.generateFakeEvents) {
    var maxApplications = Meteor.settings.development.generateFakeEvents.maxApplications;
    maxEvents = Meteor.settings.development.generateFakeEvents.maxEvents;
    console.log('regenerating max %d fake events for %d applications...', maxEvents, maxApplications);
  } else {
    console.log('WARNING : NOT regenerating fake activities');
    return;
  }

  var applicationsStage2 = Applications.find({'stages.current.id': 2}, {limit: maxApplications});
  var applicationsStage3 = Applications.find({'stages.current.id': 3}, {limit: maxApplications});

  // var locations = Locations.find().fetch();
  Events.remove({});

  if (Events.find().count() === 0) {
    var event = {};

    for (e = 0; e < maxEvents; e++) {
      event = {
        name: 'import',
        description: 'import',
        from: new Date(),
        to: new Date(),
        location: randomCollectionElement(Locations)._id,
        stage2: [],
        stage3: [],
        stage: 2,
      };
      applicationsStage2.forEach(function(application) {
        event.stage2.push(application._id);
      });

      applicationsStage3.forEach(function(application) {
        event.stage3.push(application._id);
      });

      //
      // se serve assegnare a random un evento ad una application
      // e' necessario prima salvare l'evento per avere l'id
      //
      event._id = Events.insert(event);
      Applications.update({'stages.current.id': 2}, {$push: {events: event}}, {multi: true});
      Applications.update({'stages.current.id': 3}, {$push: {events: event}}, {multi: true});
    }

    console.log('added', Events.find().count(), 'activities.');
  }
});
