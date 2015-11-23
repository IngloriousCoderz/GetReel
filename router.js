Router.configure({
  layoutTemplate: 'layout',
});

Router.onBeforeAction(function() {
        var currentUser = Meteor.userId();
        var currentRoute = Router.current().route.getName();

        if(currentUser) {
            console.log("GLOBAL::onBeforeAction:logged:", currentRoute);
            this.next();
        } else {
            console.log("GLOBAL::onBeforeAction:NOTlogged:", currentRoute);
            //this.render("login");
            this.next();
        }
    },
    {
        // except: [
        //             'home',
        //             'register',
        //             'login',
        //             'application'
        //         ]
        only: ['backoffice']
    }
);


Router.route('/', {
    name: 'home'
});

Router.route('/application/success', {
    name: 'application.success'
});

Router.route('/backoffice', function() {
        this.redirect('/backoffice/list');
    }
);

Router.route('/backoffice/:tab', function() {
        this.render('backoffice', {
            data: function() {
                return {activeTab: this.params.tab};
            },
        });
    }
);
