// hacky global var
eggtimer_pos = {
  pos: 0,
  dep: new Deps.Dependency,
  get: function() {
    this.dep.depend();
    return this.pos;
  },
  set: function(newValue) {
    this.pos = newValue;
    this.dep.changed();
    return this.pos;
  }
};

Template.eggtimer.helpers({
  marks: [ '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
           '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
           '6pm', '7pm', '8pm', '9pm', '10pm', '11pm' ],
});

Template.eggtimer.onRendered(function() {
  $('.eggtimer-wrapper').scroll(function() {
    var percent = $(this).scrollLeft() / $('.timeline').width();
    eggtimer_pos.set(percent);
  });
});

Template.eggtimer.events({
  'click .timeline': event => {
    event.preventDefault();

    var localX = event.pageX - $('.timeline').offset().left;
    var localY = event.pageY - $('.timeline').offset().top;

    console.log(localX, localY);
  }
});
