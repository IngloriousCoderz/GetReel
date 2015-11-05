//TODO: consider mass import from existing data
Meteor.startup(function() {
  Events.remove({});

  if (Activities.find().count() === 0) {
    var events = [
      {
        name: 'import',
        description: 'import',
        startsAtDay: new Date(),
        endsAtDay: new Date(),
        startsAtTime: new Date(),
        endsAtTime: new Date(),
        location: 'reference to locations',
        phase: 'reference to phases?', // 1,2,3, assunto
        phaseParticipants: [],
      },
    ];

    events.forEach(function(event) {
      Events.insert(event);
    });

    console.log('added', Events.find().count(), 'events.');
  }
});
