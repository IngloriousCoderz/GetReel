ReactiveTable.publish('reactiveEvents', Events, {}, {
  fields: {
    name: 1,
    from: 1,
    to: 1,
    location: 1,
    stage: 1,
  }
});
