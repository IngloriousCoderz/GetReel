//TODO: consider mass import from existing data
Meteor.startup(function() {
  if (Meteor.settings.development.generateFakeActivities) {
    var maxRecruitments = Meteor.settings.development.generateFakeActivities.maxRecruitments;
    var maxActivitiesPerRecruitment = Meteor.settings.development.generateFakeActivities.maxActivitiesPerRecruitment;
    console.log('regenerating max %d fake activities for %d recruitments...', maxActivitiesPerRecruitment, maxRecruitments);
  } else {
    console.log('WARNING : NOT regenerating fake activities');
    return;
  }

  var recruitments = Recruitments.find({'stages.current.id': {$gt: 0}}, {limit: maxRecruitments});
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
    recruitments.forEach(function(recruitment) {
      var maxActivities = Math.floor(Math.random() * maxActivitiesPerRecruitment);
      for (i = 0; i < maxActivities; i++) {
        activity = {
          lastname: recruitment.lastname,
          firstname: recruitment.firstname,
          createdBy: recruiter.username,
          ssn: recruitment.socialSecurityNumber,
          stage: recruitment.stages.current.id,
          contactType: randomCollectionElement(ContactTypes)._id,
          outcome: randomCollectionElement(ActivityOutcomes).id,
          notes: Math.random() >= 0.5 ? 'blablabla' : '',
          deadline: new Date(),
          createdAt: new Date(),
          editedAt: new Date(),
        };

        activity._id = Activities.insert(activity);
        Recruitments.update({_id: recruitment._id}, {$push: {activities: activity._id}});
      }
    });

    console.log('added', Activities.find().count(), 'activities.');
  }
});
