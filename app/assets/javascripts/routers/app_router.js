Kittenstagram.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.collection = options.collection

		this.addProfilePane();
	},

	routes: {
		"": "feedIndex",
		"new":"newPhoto",
		"users/:id":"usersShowPage",
		"photos/:id": "photoShowPage"
	},

	feedIndex: function(){
		Kittenstagram.feedPhotos.fetch();
		var feedIndex = new Kittenstagram.Views.PhotosIndex({ 
			collection: Kittenstagram.feedPhotos
		});
		this._swapView(feedIndex)
	},

	newPhoto: function(){
		var newPhotoPage = new Kittenstagram.Views.NewPhoto({
			collection: Kittenstagram.feedPhotos
		});
		this._swapView(newPhotoPage)
	},

	usersShowPage: function(id){
		var user = new Kittenstagram.Models.User({ id: id });
		var userShowPage = new Kittenstagram.Views.UsersShow({ model: user });
		user.fetch()
		this._swapView(userShowPage)
	},

	photoShowPage: function(id){
		var photo = new Kittenstagram.Models.Photo({ id: id });
		photo.fetch();
		
		var photoShowPage = new Kittenstagram.Views.SingularPhotoShow({
			model: photo,
			collection: photo.likes()
		});
		this._swapView(photoShowPage);
	},

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  addProfilePane: function(){
  	var user = new Kittenstagram.Models.User({ id: CURRENT_USER_ID });
  	user.fetch();
  	var navbarPhoto = new Kittenstagram.Views.Navbar({
  		model: user
  	});
  	$('.navbar-profile-pane').html(navbarPhoto.render().$el);
  }
});
