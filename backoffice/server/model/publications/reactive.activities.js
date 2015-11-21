ReactiveTable.publish('reactiveActivities', Activities, {}, {
  fields: {
    lastname: 1,
    firstname: 1,
    createdBy: 1,
    phase: 1,
    contactType: 1,
    outcome: 1,
    notes: 1,
    deadline: 1,
    createdAt: 1,
    editedAt: 1,
  }
});
