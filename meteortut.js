if (Meteor.isClient) {
  Template.body.helpers({
    tasks: [
      { text: "1" },
      { text: "2" },
      { text: "3" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
