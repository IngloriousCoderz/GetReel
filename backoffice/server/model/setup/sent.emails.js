//TODO: consider mass import from existing data
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

    console.log('added', SentEmails.find().count(), 'sent emails.');
  }
});
