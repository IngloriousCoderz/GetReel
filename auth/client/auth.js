Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        Router.go('home');
      }
    });
  }

});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        var currentRoute = Router.current().route.getName();
        console.log('currentRoute', currentRoute);
        if (currentRoute == "login") {
          Router.go('home');
        }
      }
    });
  }
});

Template.logout.events({
  'click .logout': function(event) {
    event.preventDefault();
    console.log('logout');
    Meteor.logout();
    Router.go('login');
  }
});
