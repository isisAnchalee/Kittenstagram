Kittenstagram.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.collection = options.collection
	},

	routes: {
		"": "feedIndex",
		"/new":"newPhoto",
		"users/:id":"usersShowPage"
	},

	feedIndex: function(){
		var feedIndex = new Kittenstagram.Views.PhotosIndex({ 
			collection: Kittenstagram.photos
		});
		this._swapView(feedIndex)
	},

	usersShowPage: function(id){
		var user = new Kittenstagram.Models.User({ id: id });
		var userShowPage = new Kittenstagram.Views.UsersShow({ model: user })
		this._swapView(userShowPage)
	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
