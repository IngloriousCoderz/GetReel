ReactiveTable.publish('reactiveRecruitments', Recruitments, {}, {
  fields: {
    'application.email': 1,
    createdAt: 1,
    'application.firstname': 1,
    'application.lastname': 1,
    'application.age': 1,
    'application.city': 1,
    'application.province': 1,
    'application.region': 1,
    'application.mobile': 1,
    'application.experienceAsPhotographer': 1,
    'application.experienceAsOther': 1,
    'application.photo': 1,
    'stages.current': 1,
    activities: 1,
    events: 1,
  }
});
