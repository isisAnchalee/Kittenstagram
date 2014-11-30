Kittenstagram.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['users/edit_profile'],
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }

});