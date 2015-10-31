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
        not: e.target['createdAt-not'].checked,
        op: e.target['createdAt-criterion'].value,
        value: e.target.createdAt.value,
        from: e.target['createdAt-from'].value,
        to: e.target['createdAt-to'].value,
      },
      recruiter: {
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
			if (criterion.value) {
                // console.log('criterionName', criterionName);
                // console.log('criterion.value', criterion.value);
                // console.log('criterion.op', criterion.op);
                mongo[criterionName] = {};
                switch (criterion.op) {
                    case 'eq':
                        switch (criterionName) {
        					case 'recruiter':
        						// mongo['status.recruiter._id'] = criteria[criterion].value;
        						condition['status.recruiter._id'] = criterion.value;
        					break;
                            case 'createdAt':
                                var cd = criterion;
                                cd.value = new Date(cd.value);
                                var dayAfter = new Date(cd.value);
                                dayAfter.setDate(cd.value.getDate() + 1);
                                condition = {
                                	$gte: cd.value,
                                	$lt: dayAfter,
                                };
                                break;
        					default:
        						condition[criterionName] = criterion.value;
        					break;
        				}
                    break;
                    case 'gt':
                        condition = { $gt: criterion.value};
                    break;
                    case 'lt':
                        condition = { $lt: criterion.value};
                    break;
                    default:
                        //throw('operator not supported ' + criterion.op);
                    break;
                }
			}
			if (criterion.from && criterion.to) {
                    mongo[criterionName] = {};
                    switch (criterion.op) {
                        case 'between':
                        switch (criterionName) {
                            case 'createdAt':
                                var cd = criterion;
                                cd.from = new Date(cd.from);
                                cd.to = new Date(cd.to);
                                cd.to.setDate(cd.to.getDate() + 1);
                                condition = {
                                	$gte: cd.from,
                                	$lt: cd.to,
                                };
                                break;
        					default:
        						condition[criterionName] = criterion.value;
        					break;
        				}
                        break;
                        default:
                            condition = {
                                $gte: criterion.from,
                                $lte: criterion.to,
                            }
                        break;
				}
			}

            if (mongo[criterionName]) {
                if(criterion.not) {
                    mongo[criterionName].$not = condition;
                } else {
                    mongo[criterionName] = condition;
                }
            }
		}
	}
	return mongo;
}
