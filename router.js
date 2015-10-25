Router.configure({
  layoutTemplate: 'Layout',
});

Router.map(function() {
  this.route('/', {name: 'home'});
  this.route('/apply');
  this.route('/apply/success', {name: 'apply.success'});
  this.route('/recruit', {template: 'PrivateArea' });
});
