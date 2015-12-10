Template.share.helpers({
  messages: _ => {
    return Messages.find({});
  },
});

Template.therapist.helpers({
  messages: _ => {
    return Messages.find({});
  },
});

Template.share.events({
  "keypress .message-text": event => {
    if (event.which === 13) {
      console.log(event);
      event.preventDefault();

      Messages.insert({
        msg: event.target.value,
        who: 0,
        createdAt: new Date(),
      });

      event.target.value = "";
    }
  },
});

Template.therapist.events({
  "keypress .message-text": event => {
    if (event.which === 13) {
      console.log(event);
      event.preventDefault();

      Messages.insert({
        msg: event.target.value,
        who: 1,
        createdAt: new Date(),
      });

      event.target.value = "";
    }
  },
});

Template.message.events({
  "click .message": function() {
    Messages.remove(this._id);
  }
});

Template.oppositemessage.events({
  "click .message": function() {
    Messages.remove(this._id);
  }
});
