Meteor.subscribe('recruiters');
Meteor.subscribe('stages');
Meteor.subscribe('regions');

Template.filter.onRendered(function() {
  this.$(':checkbox#more-options').change();
});

Template.filter.helpers({
  recruiters: function() {
    return Meteor.users.find({roles: 'recruiter'});
  },

  stages: function() {
    return Stages.find();
  },

  regions: function() {
    return Regions.find();
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
