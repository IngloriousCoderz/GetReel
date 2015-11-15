Meteor.subscribe('statuses');
Meteor.subscribe('regions');
Meteor.subscribe('recruiters');

Template.filter.onRendered(function() {
  this.$(':checkbox#more-options').change();
});

Template.filter.helpers({
  statuses: function() {
    return Statuses.find();
  },

  regions: function() {
    return Regions.find();
  },

  recruiters: function() {
    return Meteor.users.find({roles: 'recruiter'});
  },
});

Template.filter.events({
  'change :checkbox#more-options': function(e) {
    var moreOptions = $(e.target).prop('checked');
    $('.options').toggleClass('hidden', !moreOptions);
    if (!moreOptions) {
      $('select.filter').val('eq').trigger('change:all');
    }
  },
});
