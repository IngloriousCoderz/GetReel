Meteor.subscribe('statuses');
Meteor.subscribe('regions');
Meteor.subscribe('recruiters');

Session.setDefault('mongo-filter', {});

Template.filter.helpers({
  statuses: function() {
    return Statuses.find();
  },

  regions: function() {
    return Regions.find();
  },

  recruiters: function() {
    return Meteor.users.find();
  },
});

Template.filter.events({
  'change :checkbox#more-options': function(e) {
    $('.options').toggleClass('hidden', !$(e.target).prop('checked'));
  },

  'submit #filterForm': function(e) {
    e.preventDefault();
    var criteria = {
      creationDate: {
        not: e.target['createdAt-not'].checked,
        criterion: e.target['createdAt-criterion'].value,
        at: e.target.createdAt.value,
      },
      recruiter: e.target.recruiter.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      age: e.target.age.value,
      mobile: e.target.mobile.value,
      status: e.target.status.value,
      region: e.target.region.value,
    };
    console.log('criteria:', JSON.stringify(criteria));

    var mongo = {};
    var cd = criteria.creationDate;
    if (cd.at) {
      cd.at = new Date(cd.at);
      mongo.createdAt = {};

      var condition = '';
      switch (cd.criterion) {
        case 'eq':
          var dayAfter = new Date(cd.at);
          dayAfter.setDate(cd.at.getDate() + 1);
          condition = { $gte: cd.at, $lt: dayAfter };
          break;
        case 'gt':
          condition = {$gt: cd.at};
          break;
        case 'lt':
          condition = {$lt: cd.at};
          break;
        case 'between':

          // todo
          break;
        case 'empty':

          //condition = {""}; // empty?
          break;
      }
      if (cd.not) {
        mongo.createdAt.$not = condition;
      } else {
        mongo.createdAt = condition;
      }

    }

    for (var criterion in criteria) {
      if (criteria.hasOwnProperty(criterion)) {
        if (criteria[criterion] && typeof criteria[criterion] != 'object') {
          if (criterion === 'recruiter') {
            mongo['status.recruiter'] = criteria[criterion];
          } else {
            mongo[criterion] = criteria[criterion];
          }
        }
      }
    }

    console.log('mongo query:', JSON.stringify(mongo));
    Session.set('mongo-filter', mongo);
  },
});
