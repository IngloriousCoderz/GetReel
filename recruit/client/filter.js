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
      createdAt: {
        isDate: true,
        not: e.target['createdAt-not'].checked,
        op: e.target['createdAt-criterion'].value,
        value: e.target.createdAt.value,
        from: e.target['createdAt-from'].value,
        to: e.target['createdAt-to'].value,
      },
      recruiter: {
          field: 'status.recruiter._id',
          not: e.target['recruiter-not'].checked,
          op: e.target['recruiter-criterion'].value,
          value: e.target['recruiter-id'].value,
      },
      firstname: {
          not: e.target['firstname-not'].checked,
          op: e.target['firstname-criterion'].value,
          value: e.target.firstname.value,
      },
      lastname: {
          not: e.target['lastname-not'].checked,
          op: e.target['lastname-criterion'].value,
          value: e.target.lastname.value,
      },
      age: {
          not: e.target['age-not'].checked,
          op: e.target['age-criterion'].value,
          value: e.target.age.value,
      },
      mobile: {
          not: e.target['mobile-not'].checked,
          op: e.target['mobile-criterion'].value,
          value: e.target.mobile.value,
      },
      status: {
          not: e.target['status-not'].checked,
          op: e.target['status-criterion'].value,
          value: e.target.status.value,
      },
      region: {
          not: e.target['region-not'].checked,
          op: e.target['region-criterion'].value,
          value: e.target.region.value,
      },
    };
    console.log('criteria:', JSON.stringify(criteria));

    var mongo = getMongoQuery(criteria);

    console.log('mongo query:', JSON.stringify(mongo));
    Session.set('mongo-filter', mongo);
  },
});



var getMongoQuery = function(criteria) {
	var mongo = {};

	for (var criterionName in criteria) {
		if (criteria.hasOwnProperty(criterionName)) {
            var condition = {};
            var criterion = criteria[criterionName];
            if(!criterion.field) {
                criterion.field = criterionName;
            }

			if (criterion.value) {
                if(criterion.isDate) {
                    criterion.value = new Date(criterion.value);
                }
                mongo[criterion.field] = {};
                switch (criterion.op) {
                    case 'eq':
                        if(criterion.isDate) {
                            var dayAfter = new Date(criterion.value);
                            dayAfter.setDate(criterion.value.getDate() + 1);
                            condition = {
                            	$gte: criterion.value,
                            	$lt: dayAfter,
                            };
                        } else {
                            condition = criterion.value;
                        }
                    break;
                    case 'gt':
                        condition = { $gt: criterion.value};
                    break;
                    case 'lt':
                        condition = { $lt: criterion.value};
                    break;
                    default:
                        throw('operator not supported: ' + criterion.op);
                    break;
                }
			}

			if (criterion.from && criterion.to) {
                    if(criterion.isDate) {
                        criterion.from = new Date(criterion.from);
                        criterion.to = new Date(criterion.to);
                    }
                    mongo[criterion.field] = {};
                    switch (criterion.op) {
                        case 'between':
                            if(criterion.isDate) {
                                criterion.to.setDate(criterion.to.getDate() + 1);
                                condition = {
                                	$gte: criterion.from,
                                	$lt: criterion.to,
                                };
                            } else {
                                condition = criterion.value;
                            }
                        break;
                        default:
                            // condition = {
                            //     $gte: criterion.from,
                            //     $lte: criterion.to,
                            // }
                            throw('operator not supported: ' + criterion.op);
                        break;
				}
			}

            if(criterion.op === "empty") {
                mongo[criterion.field] = {};
                condition = {
                    $exists : false,
                };
            }

            if (mongo[criterion.field]) {
                if(criterion.not) {
                    mongo[criterion.field].$not = condition;
                } else {
                    mongo[criterion.field] = condition;
                }
            }
		}
	}
	return mongo;
}
