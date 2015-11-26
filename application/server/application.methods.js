Meteor.methods({
  'submitApplication': function(data) {
    var recruitment = {
      createdAt: new Date(),
      application: data,
      stages: {
        history: [Stages.findOne({
          id: 0
        })],
      },
    };
    recruitment.stages.current = recruitment.stages.history[0];
    Recruitments.insert(recruitment);
  },
});
