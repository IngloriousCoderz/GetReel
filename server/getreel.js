Jobs = new Mongo.Collection('jobs'); //both on client and server
Applications = new Mongo.Collection('applications');

// added repoz channel

Meteor.startup(function() {
  // console.log('Jobs.remove({})');
  // Jobs.remove({});
  var jobCount = Jobs.find().count();

  if (jobCount > 0) {
    console.log(
      'server/getreel.js:',
      'job count > 0 (', jobCount, '): no insert needed'
    );
    return;
  }

  console.log(
    'server/getreel.js:',
    'job count = 0: inserting jobs'
  );
  var jobs = [
    {title: 'Select a job position...'},
    {title: 'Haiti Village Photographer'},
    {title: 'Rapallo On The Beach'}
  ];
  jobs.forEach(function(job) {
    Jobs.insert(job);
  });
});

Meteor.methods({
  submit: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Applications.insert(application);
  }
});
