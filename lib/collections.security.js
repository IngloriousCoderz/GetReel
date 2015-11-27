console.log("collections.security");

Security = new Meteor.Collection('security');


Meteor.methods({
	security_insert: function() {
		console.log("security_insert");
		if ( !Meteor.userId()) {
     		throw new Meteor.Error("not-authorized");
		}
	 	var securityId = Security.insert({test:'test'});
		return securityId;
	},
	security_remove: function(id) {
		console.log("security_remove");
		Security.remove(id);
	}
});
