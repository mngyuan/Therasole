Template.settings.helpers({
  mockdata: _ => {
    return MockData.find({});
  },
});

Template.settings.events({
  "submit .new-task": event => {
    event.preventDefault();
    console.log(event);

    // for (var i = 0; i < 40; i++) {
    //   MockData.insert({
    //     timestamp: event.target.text.value,
    //     data1: Math.floor(Math.random()*5) + 3,
    //     data2: Math.floor(Math.random()*5) + 3,
    //     data3: Math.floor(Math.random()*5) + 3,
    //     data4: Math.floor(Math.random()*5) + 3,
    //     data5: Math.floor(Math.random()*5) + 3,
    //     data6: Math.floor(Math.random()*5) + 3,
    //     createdAt: new Date(),
    //   });
    // }
    MockData.insert({
      timestamp: event.target.text.value,
      data1: event.target.data1.value,
      data2: event.target.data2.value,
      data3: event.target.data3.value,
      data4: event.target.data4.value,
      data5: event.target.data5.value,
      data6: event.target.data6.value,
      createdAt: new Date(),
    });
  },
});

Template.mockdataentry.events({
  "click .delete": function() {
    MockData.remove(this._id);
  }
});
