//TODO: consider mass import from existing data
Meteor.startup(function() {
  var maxEvents = 0;
  if (Meteor.settings.development.generateFakeEvents) {
    var maxRecruitments = Meteor.settings.development.generateFakeEvents.maxRecruitments;
    maxEvents = Meteor.settings.development.generateFakeEvents.maxEvents;
    console.log('regenerating max %d fake events for %d recruitments...', maxEvents, maxRecruitments);
  } else {
    console.log('WARNING : NOT regenerating fake activities');
    return;
  }

  var recruitmentsStage2 = Recruitments.find({'stages.current.id': 2}, {limit: maxRecruitments});
  var recruitmentsStage3 = Recruitments.find({'stages.current.id': 3}, {limit: maxRecruitments});

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
      recruitmentsStage2.forEach(function(recruitment) {
        event.stage2.push(recruitment._id);
      });

      recruitmentsStage3.forEach(function(recruitment) {
        event.stage3.push(recruitment._id);
      });

      //
      // se serve assegnare a random un evento ad una recruitment
      // e' necessario prima salvare l'evento per avere l'id
      //
      event._id = Events.insert(event);
      Recruitments.update({'stages.current.id': 2}, {$push: {events: event}}, {multi: true});
      Recruitments.update({'stages.current.id': 3}, {$push: {events: event}}, {multi: true});
    }

    console.log('added', Events.find().count(), 'activities.');
  }
});
