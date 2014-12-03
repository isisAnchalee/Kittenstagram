Kittenstagram.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST['comments/new'],

  events:{
  	"submit .new-comment": "createNewComment"
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
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
        //should get all the user profile stuff from rails
        that.model.comments().add(comment);
      }
    });
  }

});

