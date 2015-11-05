//TODO: move "select"  choice to interface
Meteor.startup(function() {
  Jobs.remove({});

  if (Jobs.find().count() === 0) {
    var jobs = [
      {title: 'Select a job position...'},
      {title: 'Haiti Village Photographer'},
      {title: 'Rapallo On The Beach'},
    ];

    jobs.forEach(function(job) {
      Jobs.insert(job);
    });

    console.log('added', Jobs.find().count(), 'jobs.');
  }
});
