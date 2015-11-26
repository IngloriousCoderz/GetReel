//TODO: consider mass import from existing data
Meteor.startup(function() {
  if (!Meteor.settings.development.generateFakeCareers) {
    console.log('WARNING : NOT regenerating fake careers');
    return;
  }

  var maxRecruitments = Meteor.settings.development.generateFakeCareers.maxRecruitments;
  var maxCareersPerRecruitment = Meteor.settings.development.generateFakeCareers.maxCareersPerRecruitment;
  console.log('regenerating max %d fake careers for %d recruitments...', maxCareersPerRecruitment, maxRecruitments);

  var recruitments = Recruitments.find({}, {
    limit: maxRecruitments
  });

  var seasonsCursor = Seasons.find();
  var seasonsArray = seasonsCursor.fetch();

  CareerSteps.remove({});

  if (CareerSteps.find().count() === 0) {
    var step = {};
    recruitments.forEach(function(recruitment) {
      for (i = 0; i < Math.floor(Math.random() * maxCareersPerRecruitment); i++) {
        step = {
          recruitment: {
            _id: recruitment._id,
            firstname: recruitment.firstname,
            lastname: recruitment.lastname,
            //socialSecurityNumber: recruitment.socialSecurityNumber,
            //stage: recruitment.stages.current,
          },
          createdAt: new Date(),
          role: randomCollectionElement(ApplicationRoles).name,
          season: randomCollectionElement(Seasons).name,
          village: 'import',
          company: randomCollectionElement(Companies).name,
          country: randomCollectionElement(Countries).name,
          roleEvaluation: randomCollectionElement(RoleEvaluations).name,
          periodFrom: 'import',
          description: 'import',
        }
        step._id = CareerSteps.insert(step);
        Recruitments.update({
          _id: recruitment._id
        }, {
          $push: {
            careerSteps: step._id
          }
        });
      }
    });

    console.log('added', CareerSteps.find().count(), 'career steps.');
  }
});
