Kittenstagram.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST['photos/photo_details'],

  initialize: function(){
    this.addLikesView();
    this.model.comments().each(this.addNewCommentView.bind(this));
    this.listenTo(this.model.comments(), "add remove", this.renderSubviews)
  },

  events:{ "click .fav-btn": "likePhoto",
  "submit .new-comment": "createNewComment"
  },

  render: function(){
  	var renderedContent = this.template({});
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  addLikesView: function(){
    var likes = this.model.likes();
    var likesSubview = new Kittenstagram.Views.LikesView({
      collection: likes,
      photo: this.model
    });

    this.addSubview(".photo-likes", likesSubview);
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment
    });
    this.addSubview(".photo-comments", newCommentView);
  },

  likePhoto: function(event){
    event.preventDefault();
    var id = this.model.id;
    var $currentTarget = $(event.currentTarget);
    var like = new Kittenstagram.Models.Like();
    like.set("photo_id", id)

    like.save({}, {
      error: function(model, resp){
        debugger;
        console.log(resp.error())
      },
      success:function(){
        console.log("yay!!")
      }
    });
  },


  heartAnimation: function(event){
    event.preventDefault();
    $('.like-heart').html("♥").toggleClass('heart').toggleClass('pulse1');
    $('.fav-btn').css('color', 'red');
    setTimeout(function(){
      $('.like-heart').html(" ").toggleClass('pulse1').toggleClass('heart');
    }, 500)
  },


  createNewComment: function(event){
    event.preventDefault();
    var that = this;
    var $currentTarget = $(event.currentTarget);
    console.log($currentTarget.serializeJSON());
    var attrs = $currentTarget.serializeJSON();
    var comment = new Kittenstagram.Models.Comment(attrs);
    comment.save({},{
      success: function(){
        console.log("HEY!!!")
        that.model.comments().add(comment);
      }
    })
  }
});