Tasks = new Mongo.Collection("tasks");

// i get the feeling there was a better routing choice other than react-router
var BlazeTemplate = React.createClass({
    componentDidMount: function() {
        var componentRoot = React.findDOMNode(this);
        var parentNode = componentRoot.parentNode;
        parentNode.removeChild(componentRoot);
        var data = {};
        _.each(this.props, function (val, key) {
            if (key.lastIndexOf('btp-', 0) === 0)
                data[key.slice(4)] = val;
        });
        return Blaze.renderWithData(this.props.template, data, parentNode);
    },
    render: function(template) {
        return (<div />)
    }
});

if (Meteor.isClient) {
  const {
    Router,
    Route,
    IndexRoute,
    Link,
    history
  } = ReactRouter;

  const browserHistory = history.createHistory();

  App = React.createClass({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return (
        <div>
          {this.props.children}

          <header>
            <h1>Todo List</h1>

            <label className="hide-completed">
              <input type="checkbox" checked="{{hideCompleted}}" />
              Hide completed tasks
            </label>
            <form className="new-task">
              <input type="text" name="text" placeholder="Type to add new tasks"/>
            </form>
          </header>

          <div>task list here</div>

          <nav>
            <ul>
              <li><a>Heatmap</a></li>
              <li><a>Graphs</a></li>
              <li><a>Share</a></li>
              <li><a>Settings</a></li>
            </ul>
          </nav>
          <footer>
          </footer>
        </div>
      );
    }
  });

  Landing = React.createClass({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return (
        <div>
          <p>This is the landing route</p>
        </div>
      );
    }
  });

  Graphs = React.createClass({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return (
        <div>
          Graphs
        </div>
      );
    }
  });

  Routes = React.createClass({
    getInitialState: function() {
      return {};
    },
    render: function() {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Landing}/>
            <Route path="graphs" component={Graphs}/>
          </Route>
        </Router>
      );
    }
  });

  $(document).ready(_ => {
    React.render(<Routes/>, document.getElementById('app'));
  });

  Template.body.helpers({
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

  Template.body.events({
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
