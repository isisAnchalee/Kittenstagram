Kittenstagram.Views.SingularPhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/singular_photo_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addComments);
    this.listenTo(this.model.comments(), "add remove", this.render);
  },

  events:{
    "submit .photo-page-comment-form" : "createNewComment",
    "click .fav-btn" : "likePhoto",
    "click .delete-photo-btn" : "deletePhoto"
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
  		photo: this.model,
      collection: this.collection
  	});

  	this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  createNewComment: function(event){
    event.preventDefault();
    var that = this;
    var $currentTarget = $(event.currentTarget);

    var attrs = $currentTarget.serializeJSON();
    var comment = new Kittenstagram.Models.Comment(attrs);
    comment.save({},{
      success: function(){
        that.model.comments().add(comment);
      }
    });
  },

  likePhoto: function(event){
    event.preventDefault();
    var that = this;
    var id = this.model.id;
    var $currentTarget = $(event.currentTarget);
    var like = new Kittenstagram.Models.Like();
    like.set("photo_id", id)

    like.save({}, {
      success:function(){
        console.log("meow!!")
        that.model.likes().add(like);
      }
    });
  },

  deletePhoto: function(event){
    event.preventDefault;
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true })
  }


  
});
