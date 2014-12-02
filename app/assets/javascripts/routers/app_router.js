Kittenstagram.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.collection = options.collection
		this.addProfilePane();
	},

	routes: {
		"": "feedIndex",
		"new": "newPhoto",
		"users/:id": "usersShowPage",
		"photos/:id": "photoShowPage",
		"edit": "editProfile",
		"explore": "explorePage"
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

  addProfilePane: function(){
  	var user = new Kittenstagram.Models.User({ id: CURRENT_USER_ID });
  	user.fetch();
  	var navbarPhoto = new Kittenstagram.Views.Navbar({
  		model: user
  	});
  	$('.navbar-profile-pane').html(navbarPhoto.render().$el);
  },

  editProfile: function(){
  	var user = new Kittenstagram.Models.User({ id: CURRENT_USER_ID});
  	user.fetch();
  	var editProfileView = new Kittenstagram.Views.EditProfile({
  		model: user
  	});
  	this._swapView(editProfileView)
  },

  explorePage: function(){
  	var recentPhotos = Kittenstagram.recentPhotos;
  	recentPhotos.fetch({
  		data: { count: 40 }
  	});

  	var explorePage = new Kittenstagram.Views.Explore({
  		collection: recentPhotos
  	});

  	this._swapView(explorePage);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
