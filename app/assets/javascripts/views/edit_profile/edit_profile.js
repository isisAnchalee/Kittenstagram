Kittenstagram.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['users/edit_profile'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  events:{
    "keyup .desc-input": "charsLeft",
    "submit form": "updateUser"
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
    var maxChars = 55,
    charsUsed = $('.desc-input').val().length,
    charsLeft= maxChars - charsUsed;
        $('#chars').text('You have ' + charsLeft + ' characters remaining!');
  },

  updateUser: function(event){
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    
    this.model.save(formData, {
      success: function(){
        Backbone.history.navigate("#", { trigger: true });
      }.bind(this)
    })

  }

});