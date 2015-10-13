Applications = new Mongo.Collection('applications');

Meteor.methods({
  submit: function(application) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Applications.insert(application);
  }
});
