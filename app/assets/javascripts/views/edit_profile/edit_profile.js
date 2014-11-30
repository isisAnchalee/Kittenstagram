Kittenstagram.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['users/edit_profile'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  events:{
    "keyup .desc-input": "charsLeft"
  },

  render: function(){
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  charsLeft: function(event){
    event.preventDefault();
    var max_chars = 100,
    chars_used = $('.desc-input').val().length,
    chars_left = max_chars - chars_used;
        $('#chars').text('You have ' + chars_left + ' characters remaining!');
  }

});