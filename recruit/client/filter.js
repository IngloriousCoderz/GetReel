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
    var moreOptions = $(e.target).prop('checked');
    $('.options').toggleClass('hidden', !moreOptions);
    if (!moreOptions) {
      $('select.filter').val('eq').change();
    }
  },

  'submit #filterForm': function(e) {
    e.preventDefault();
    var criteria = {
      creationDate: {
        not: e.target['createdAt-not'].checked,
        criterion: e.target['createdAt-criterion'].value,
        at: e.target.createdAt.value,
        from: e.target['createdAt-from'].value,
        to: e.target['createdAt-to'].value,
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
    if (cd.criterion === "empty" || cd.at || cd.from || cd.to) {
      cd.at = new Date(cd.at);
      mongo.createdAt = {};

      var condition = '';
      switch (cd.criterion) {
        case 'eq':
          var dayAfter = new Date(cd.at);
          dayAfter.setDate(cd.at.getDate() + 1);
          condition = {
            $gte: cd.at,
            $lt: dayAfter,
          };
          break;
        case 'gt':
          condition = {
            $gt: cd.at,
          };
          break;
        case 'lt':
          condition = {
            $lt: cd.at,
          };
          break;
        case 'between':
          console.log('between');
          dateTo = new Date(cd.to);
          dateTo.setDate(dateTo.getDate() + 1);
          condition = {
            $gte: new Date(cd.from),
            $lt: dateTo,
          };
          break;
        case 'empty':
            condition = {
                $exists : false
            };
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
            mongo['status.recruiter._id'] = criteria[criterion];
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
