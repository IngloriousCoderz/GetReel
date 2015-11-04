Meteor.startup(function() {
  SentEmails.remove({});

  if (SentEmails.find().count() === 0) {
    var mails = [
      {
        createdAt: new Date(),
        createdBy: 'test user',
        sender: 'sender test',
        subject: 'subject test',
        message: 'message test',
      },
    ];

    mails.forEach(function(mail) {
      SentEmails.insert(mail);
    });

    console.log('added', Locations.find().count(), 'sent emails.');
  }
});
