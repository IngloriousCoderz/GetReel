Router.configure({
  layoutTemplate: 'layout',
});

Router.map(function() {
  this.route('/', {name: 'home'});
  this.route('/application/success', {name: 'application.success'});
  this.route('/backoffice', function() {
    this.redirect('/backoffice/list');
  });
  this.route('/backoffice/:tab', function() {
    this.render('backoffice', {
      data: function() {
        return {activeTab: this.params.tab};
      },
    });
  });
});
