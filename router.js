Router.configure({
  layoutTemplate: 'Layout',
});

Router.map(function() {
  this.route('/', {name: 'home'});
  this.route('/apply');
  this.route('/apply/general-info');
  this.route('/apply/studies');
  this.route('/apply/success', {name: 'apply.success'});
});
