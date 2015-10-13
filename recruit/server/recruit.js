Jobs = new Mongo.Collection('jobs');

Meteor.startup(function() {
  if (Jobs.find().count() === 0) {
    var jobs = [
      {title: 'Select a job position...'},
      {title: 'Haiti Village Photographer'},
      {title: 'Rapallo On The Beach'}
    ];
    jobs.forEach(function(job) {
      Jobs.insert(job);
    });
  }
});