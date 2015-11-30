// implicit:
// if (Meteor.isClient) {
// golly isn't meteor such dandy software?

Template.eggtimer.helpers({
  marks: [ '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
           '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
           '6pm', '7pm', '8pm', '9pm', '10pm', '11pm' ]
});

Template.landing.helpers({
  tasks: _ => {
    if (Session.get("hideCompleted")) {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 }});
    } else {
      return Tasks.find({}, { sort: { createdAt: -1 } });
    }
  },
  hideCompleted: function() {
    return Session.get("hideCompleted");
  }
});

Template.landing.events({
  "submit .new-task": event => {
    event.preventDefault();
    var text = event.target.text.value;

    Tasks.insert({
      text,
      createdAt: new Date()
    });

    event.target.text.value = "";
  },
  "change .hide-completed input": event => {
    Session.set("hideCompleted", event.target.checked);
  }
});

Template.task.events({
  "click .toggle-checked": function() {
    Tasks.update(this._id, {
      $set: { checked: ! this.checked }
    });
  },
  "click .delete": function() {
    Tasks.remove(this._id);
  }
});
