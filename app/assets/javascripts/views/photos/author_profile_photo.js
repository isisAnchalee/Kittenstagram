Kittenstagram.Views.UsersProfilePhotoView = Backbone.View.extend({
  template: JST['photos/author-photo'],
  
  render: function(){
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});