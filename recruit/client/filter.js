Meteor.subscribe('statuses');
Meteor.subscribe('regions');

Template.filter.helpers({
  statuses: function() {
    return Statuses.find();
  },

  regions: function() {
    return Regions.find();
  },
});
