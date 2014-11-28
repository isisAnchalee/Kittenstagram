Kittenstagram.Views.ProfileDetails = Backbone.View.extend({
  template: JST['photos/profile_details'],

  render: function(){
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});