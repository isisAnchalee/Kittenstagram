Kittenstagram.Views.UsersShow = Backbone.CompositeView.extend({
	className: "users-wrapper",
  template: JST['users/show'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.addHeaderView)
    this.listenTo(this.model, 'sync', this.addUserDetailsView)
    this.listenTo(this.model, 'sync', this.addGalleryView)
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
  	var renderedContent = this.template({
  		user: this.model,
  		photos: this.model.photos()
  	});

   
  	this.$el.html(renderedContent);
     this.attachSubviews();
  	return this;
  },

  addHeaderView: function(){
    var headerSubview = new Kittenstagram.Views.UsersShowHeader({
      model: this.model,
      collection: this.model.photos()
    });

    this.addSubview(".banner-gallery-show", headerSubview);
  },

  addUserDetailsView: function(){
    var detailSubview = new Kittenstagram.Views.UserDetailsView({
      model: this.model
    });

    this.addSubview(".user-details", detailSubview);
  },

  addGalleryView: function(){
   var userImageGallery = new Kittenstagram.Views.GalleryView({
    collection: this.model.photos()
   });

   this.addSubview(".user-gallery", userImageGallery);
  }
  
});
