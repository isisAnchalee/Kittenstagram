Kittenstagram.Views.SingularPhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/singular_photo_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addComments);
  },

  events:{
    "click .fav-btn": "heartAnimation"
  },

  addComments: function(){
    var that = this;
    this.model.comments().each(function(comment){
      that.addNewCommentView(comment);
    });
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment
    });
    this.addSubview(".photo-comments", newCommentView);
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});
    debugger;
  	this.$el.html(renderedContent);
    return this;
  }
  
});
