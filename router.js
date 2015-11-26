Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
    name: 'home'
});

Router.route('/application/success', {
    name: 'application.success'
});

Router.route('/backoffice', function() {
    this.redirect('/backoffice/list');
});

Router.route('/backoffice/:tab', function() {
    this.render('backoffice', {
        data: function() {
            return {activeTab: this.params.tab};
        },
    });
});
