Meteor.subscribe('regions');

Template.filter.helpers({
  regions: function() {
    return Regions.find();
  },
});
