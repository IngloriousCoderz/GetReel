Meteor.publish('availableJobs', function() {
  return Jobs.find();
});

Meteor.methods({
  submit: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    console.log("server:submit/application:", JSON.stringify(application, null, '\t'));
    Applications.insert(application);
  },
});


