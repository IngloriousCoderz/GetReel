console.log("advanced security");

requireLogin = function() {
	console.log("advancedSecurity:requireLogin");
	var self = this;
	var next = this.next;

	if (!(Meteor.user() && Meteor.userId())) {
		self.render('login');
	} else {
		Meteor.call('security_insert', function(error, id) {
			if (error) {
                // console.log("insert failed: ", error.error);
				self.render('login');
			} else {
				Meteor.call('security_remove', id);
				next();
			}
		});
	}
}
