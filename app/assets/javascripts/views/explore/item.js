Kittenstagram.Views.ExploreItem = Backbone.CompositeView.extend({
  template: JST['explore/item'],
  className: 'col-xs-3',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var renderedContent = this.template({
      photo: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});