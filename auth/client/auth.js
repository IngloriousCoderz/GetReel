Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    Meteor.loginWithPassword(username.value, password.value, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        var currentRoute = Router.current().route.getName();
        console.log('currentRoute', currentRoute);
        if (currentRoute === 'login') {
          Router.go('home');
        }
      }
    });
  }
});

Template.logout.events({
  'submit form': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});
