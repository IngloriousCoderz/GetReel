Template.backoffice.helpers({
  tabs: function() {
    return [
      {name: 'list', slug: 'list'},
      {name: 'analysis', slug: 'analysis'},
      {name: 'activities', slug: 'activities'},
      {name: 'events', slug: 'events'},
    ];
  },

  isActiveTab: function(tab) {
    return tab === this.activeTab;
  },

  active: function(tab) {
    return tab === this.activeTab ? 'active' : '';
  }
});
