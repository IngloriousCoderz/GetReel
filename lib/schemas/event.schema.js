EventSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  from: {
    type: Date,
    defaultValue: new Date(),
    autoform: {
      type: 'bootstrap-datetimepicker',
      buttonClasses: 'glyphicon glyphicon-calendar',
    },
  },
  to: {
    type: Date,
    defaultValue: new Date(),
    autoform: {
      type: 'bootstrap-datetimepicker',
      buttonClasses: 'glyphicon glyphicon-calendar',
    },
  },
  location: {
    type: String,
    autoform: {
      options: function() {
        return Locations.find().map(function(value) {
          return {label: value.name, value: value._id};
        });
      },
    },
  },
  phase: {
    type: Number,
    autoform: {
      options: {
        2: 'phase 2',
        3: 'phase 3',
      },
    },
  },
});

Meteor.startup(function() {
  EventSchema.i18n('schemas.event');
  Events.attachSchema(EventSchema);
});
