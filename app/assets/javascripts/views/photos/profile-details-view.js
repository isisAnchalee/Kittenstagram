Kittenstagram.Views.ProfileDetails = Backbone.CompositeView.extend({
  template: JST['photos/profile_details'],

  render: function(){
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});