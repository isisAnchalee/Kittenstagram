Kittenstagram.Views.GalleryImageView = Backbone.CompositeView.extend({
  template: JST['users/gallery_image_view'],
  className: 'col-xs-3',

  events:{
  	'click .gallery-image': 'showModal',
  	'hidden.bs.modal .modal': 'removeModalEvent',

  },

  showModal: function(event){
  	event.preventDefault();
 		this.addPhotoShow();
  	this.$('.modal').modal();
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
  	this.attachSubviews();
  	return this;
  },

  removeModalEvent: function(event){
  	event.preventDefault()
    var imageShow = this.subviews()['.modal-photo-page'][0];
    this.removeSubview(".modal-photo-page", imageShow);

  },

  addPhotoShow: function(){
    var galleryPhoto = new Kittenstagram.Views.SingularPhotoShow({
      model: this.model
    });

    this.addSubview(".modal-photo-page", galleryPhoto);
  }
  
});

  