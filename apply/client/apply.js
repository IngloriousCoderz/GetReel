Meteor.subscribe('availableJobs');

Session.set('application', {step: 1});

Template.Apply.helpers({
  application: function() {
    return Session.get('application');
  },

  isTabDisabled: function(tabNumber) {
    return tabNumber > Session.get('application').step;
  },

  availableJobs: function() {
    return Jobs.find();
  },
});

Template.Apply.rendered = function() {
  $('#steps li:eq(' + (Session.get('application').step - 1) + ') a').tab('show');
};

Template.Apply.events({
  'click #steps a': function(e) {
    e.preventDefault();

    var $link = $(e.target);
    if ($link.parent('li').hasClass('disabled')) {
      return;
    }

    var application = Session.get('application');
    application.step = $link.attr('href').slice(4);
    Session.set('application', application);

    $link.tab('show');
  },

  'change input, change select': function(e) {
    application = Session.get('application');
    application[e.target.name] = e.target.value;
    Session.set('application', application);
  },
});
