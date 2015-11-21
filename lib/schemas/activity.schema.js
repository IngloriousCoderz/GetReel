ActivitySchema = new SimpleSchema({
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  createdBy: {
    type: String,
    defaultValue: Meteor.userId,
    autoform: {
      disabled: true,
    },
  },
  ssn: {
    type: String,
  },
  phase: {
    type: Number,
    autoform: {
      options: {
        1: 'phase 1',
        2: 'phase 2',
        3: 'phase 3',
        4: 'recruited',
      },
    },
  },
  contactType: {
    type: String,
    autoform: {
      options: function() {
        var contactTypes = ContactTypes.find().fetch();
        return contactTypes.map(function(value) {
          return {label: value.name, value: value._id};
        });
      },
    },
  },
  outcome: {
    type: Number,
    autoform: {
      options: function() {
        var outcomes = ActivityOutcomes.find().fetch();
        return outcomes.map(function(value) {
          return {label: value.name, value: value.id};
        });
      },
    },
  },
  notes: {
    type: String,
    optional: true,
    autoform: {
      rows: 6,
    },
  },
  deadline: {
    type: Date,
    optional: true,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    autoform: {
      disabled: true,
    },
  },
  editedAt: {
    type: Date,
    defaultValue: new Date(),
    autoform: {
      disabled: true,
    },
  },
});

Meteor.startup(function() {
  ActivitySchema.i18n('schemas.activity');
  // Activities.attachSchema(ActivitySchema);
});
