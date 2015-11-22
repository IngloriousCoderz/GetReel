//TODO: consider mass import from existing data
Meteor.startup(function() {
  if (Meteor.settings.development.generateFakeActivities) {
    var maxApplications = Meteor.settings.development.generateFakeActivities.maxApplications;
    var maxActivitiesPerApplication = Meteor.settings.development.generateFakeActivities.maxActivitiesPerApplication;
    console.log('regenerating max %d fake activities for %d applications...', maxActivitiesPerApplication, maxApplications);
  } else {
    console.log('WARNING : NOT regenerating fake activities');
    return;
  }

  var applications = Applications.find({'phases.current.id': {$gt: 0}}, {limit: maxApplications});
  var recruiter = Meteor.users.findOne({
    roles: 'recruiter',
  }, {
    fields: {
      _id: 1,
      username: 1,
    },
  });

  Activities.remove({});

  if (Activities.find().count() === 0) {
    var activity = {};
    applications.forEach(function(application) {
      var maxActivities = Math.floor(Math.random() * maxActivitiesPerApplication);
      for (i = 0; i < maxActivities; i++) {
        activity = {
          lastname: application.lastname,
          firstname: application.firstname,
          createdBy: recruiter.username,
          ssn: application.socialSecurityNumber,
          phase: application.phases.current.id,
          contactType: randomCollectionElement(ContactTypes)._id,
          outcome: randomCollectionElement(ActivityOutcomes).id,
          notes: Math.random() >= 0.5 ? 'blablabla' : '',
          deadline: new Date(),
          createdAt: new Date(),
          editedAt: new Date(),
        };

        activity._id = Activities.insert(activity);
        Applications.update({_id: application._id}, {$push: {activities: activity._id}});
      }
    });

    console.log('added', Activities.find().count(), 'activities.');
  }
});
