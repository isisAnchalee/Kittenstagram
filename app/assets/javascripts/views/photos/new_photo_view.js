Kittenstagram.Views.NewPhoto = Backbone.View.extend({

  initialize: function () {
    this.editor = null;
  },
  
  id: 'editor-container',

  template: JST['photos/new'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }


});
