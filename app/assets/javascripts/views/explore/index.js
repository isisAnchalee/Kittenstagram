Kittenstagram.Views.Explore = Backbone.CompositeView.extend({ 
  template: JST['explore/index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.createSubviews)
  },

  render: function(){
    var renderedContent = this.template({
      collection: this.collection
    });

    this.attachSubviews();
    this.$el.html(renderedContent);
    return this;
  },

  createSubviews: function(){
    this.collection.each(this.addItem.bind(this));
  },

  addItem: function(item){
    var item = new Kittenstagram.Views.ExploreItem({ 
      model: item 
    });

    this.addSubview('.row', item);
  }
});