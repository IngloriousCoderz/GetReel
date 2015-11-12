Router.configure({
  layoutTemplate: 'layout',
});

Router.map(function() {
  this.route('/', {name: 'home'});
  this.route('/application/success', {name: 'application.success'});
  this.route('/backoffice');
  this.route('/application/:step', { name: 'application'});
});
