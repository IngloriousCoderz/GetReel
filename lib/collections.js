Regions = new Mongo.Collection('regions');
Statuses = new Mongo.Collection('statuses');
Jobs = new Mongo.Collection('jobs');
Applications = new Mongo.Collection('applications');
// http://stackoverflow.com/questions/9868323/is-there-a-convention-to-name-collection-in-mongodb
ActivityOutcomes = new Mongo.Collection('activity.outcomes');
OutcomeReasons = new Mongo.Collection('outcome.reasons');
OutcomeReasons2 = new Mongo.Collection('outcome.reasons2');
OutcomeReasons3 = new Mongo.Collection('outcome.reasons3');
Locations = new Mongo.Collection('locations');
ApplicationRoles = new Mongo.Collection('application.roles');
Companies = new Mongo.Collection('companies');
Selectors = new Mongo.Collection('selectors');
Seasons = new Mongo.Collection('seasons');
Referrers = new Mongo.Collection('referrers');
DocumentTypes = new Mongo.Collection('document.types');
ContactTypes = new Mongo.Collection('contact.types');
RoleEvaluations = new Mongo.Collection('role.evaluations');
Parameters = new Mongo.Collection('parameters');
SentEmails = new Mongo.Collection('sent.emails');
OpticalArchive = new Mongo.Collection('optical.archive');
CareerPaths = new Mongo.Collection('career.paths');
Nations = new Mongo.Collection('nations');
/*
var profilePicStore = new FS.Store.GridFS('profilePics');
var createThumb = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
};
var profileThumbStore = new FS.Store.GridFS('profileThumbs', {
  transformWrite: createThumb
});
var resumeStore = new FS.Store.GridFS('resumes');
var showreelStore = new FS.Store.GridFS('showreels');

ProfilePics = new FS.Collection('profilePics', {
  stores: [
    profilePicStore,
    //profileThumbStore
  ],
  filter: {
    maxSize: 1048576,
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png']
    },
    onInvalid: function(message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
  }
});
Resumes = new FS.Collection('resumes', {stores: [resumeStore]});
Showreels = new FS.Collection('showreels', {stores: [showreelStore]});
*/
