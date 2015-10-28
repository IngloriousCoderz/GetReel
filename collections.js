Regions = new Mongo.Collection('regions');
Statuses = new Mongo.Collection('statuses');
Jobs = new Mongo.Collection('jobs');
Applications = new Mongo.Collection('applications');

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
