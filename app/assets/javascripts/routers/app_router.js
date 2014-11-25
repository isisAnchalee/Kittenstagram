Kittenstagram.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.collection = options.collection
	},

	routes: {
		"": "feedIndex",
		"/new":"newPhoto"
	},

	feedIndex: function(){
		var feedIndex = new Kittenstagram.Views.PhotosIndex({ 
			collection: Kittenstagram.photos
		});
		this._swapView(feedIndex)
	},

	newPhoto: function(){

	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
