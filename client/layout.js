Template.layout.helpers({
  loginRequired: function() {
    return Router.current().route.getName() === 'backoffice.tab';
  },
});
