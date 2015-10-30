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
        value: e.target.createdAt.value,
        from: e.target['createdAt-from'].value,
        to: e.target['createdAt-to'].value,
      },
      recruiter: {
          not: e.target['recruiter-not'].checked,
          criterion: e.target['recruiter-criterion'].value,
          value: e.target['recruiter-id'].value,
      },
      firstname: {
          not: e.target['firstname-not'].checked,
          criterion: e.target['firstname-criterion'].value,
          value: e.target.firstname.value,
      },
      lastname: {
          not: e.target['lastname-not'].checked,
          criterion: e.target['lastname-criterion'].value,
          value: e.target.lastname.value,
      },
      age: {
          not: e.target['age-not'].checked,
          criterion: e.target['age-criterion'].value,
          value: e.target.age.value,
      },
      mobile: {
          not: e.target['mobile-not'].checked,
          criterion: e.target['mobile-criterion'].value,
          value: e.target.mobile.value,
      },
      status: {
          not: e.target['status-not'].checked,
          criterion: e.target['status-criterion'].value,
          value: e.target.status.value,
      },
      region: {
          not: e.target['region-not'].checked,
          criterion: e.target['region-criterion'].value,
          value: e.target.region.value,
      },
    };
    console.log('criteria:', JSON.stringify(criteria));

    var mongo = getMongoQuery(criteria);

    console.log('mongo query:', JSON.stringify(mongo));
    Session.set('mongo-filter', mongo);
  },
});



var getMongoQuery = function (criteria) {
    var mongo = {};
    var cd = criteria.creationDate;

    if (cd.criterion === "empty" || cd.value || cd.from || cd.to) {
      cd.value = new Date(cd.value);
      mongo.createdAt = {};

      var condition = '';
      switch (cd.criterion) {
        case 'eq':
          var dayAfter = new Date(cd.value);
          dayAfter.setDate(cd.value.getDate() + 1);
          condition = {
            $gte: cd.value,
            $lt: dayAfter,
          };
          break;
        case 'gt':
          condition = {
            $gt: cd.value,
          };
          break;
        case 'lt':
          condition = {
            $lt: cd.value,
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
          console.log('criterion', criterion);
        if (criteria[criterion].value /*&& typeof criteria[criterion] != 'object'*/) {
          if (criterion === 'recruiter') {
            mongo['status.recruiter._id'] = criteria[criterion].value;
          } else {
            mongo[criterion] = criteria[criterion].value;
          }
        }
        if (criteria[criterion].from &&  criteria[criterion].to) {
            mongo[criterion] = {
                $gte: criteria[criterion].from,
                $lte: criteria[criterion].from,
            }
        }

      }
    }

    return mongo;
}
