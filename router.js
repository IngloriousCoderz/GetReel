Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'home'
});

Router.route('/application/success', {
  name: 'application.success'
});

Router.route('/application/:step?', {
  name: 'application',
  onBeforeAction: function() {
    if (!this.params.step) {
      this.redirect('application', {
        step: 'general-info',
      });
    } else {
      this.next();
    }
  },
});

Router.route('/backoffice', function() {
  this.redirect('/backoffice/list');
});

Router.route('/backoffice/:tab', function() {
  this.render('backoffice', {
    data: function() {
      return {
        activeTab: this.params.tab
      };
    },
  });
});
