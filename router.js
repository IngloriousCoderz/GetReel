Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
    name: 'home'
});

Router.route('/recruitment/success', {
    name: 'recruitment.success'
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
