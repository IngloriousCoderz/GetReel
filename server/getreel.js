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
  Jobs.insert([
    {title: 'Select a job position...'},
    {title: 'Haiti Village Photographer'},
    {title: 'Rapallo On The Beach'}
  ]);
});

Meteor.methods({
  apply: function(args) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(args);

    Applications.insert({
      createdAt: new Date(),
      applicant: Meteor.userId(),
      firstname: args.firstname,
      lastname: args.lastname,
      job: args.job,
      resume: args.resume,
      videofile: args.videofile,
      videolink: args.videolink
    });
  }
});
