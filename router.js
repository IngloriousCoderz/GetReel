Router.configure({
  layoutTemplate: 'Layout',
});

Router.route('/', {name: 'home'});
Router.route('/apply');
Router.route('/apply/success', {name: 'apply.success'});
