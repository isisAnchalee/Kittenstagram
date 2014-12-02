Kittenstagram.Views.NewPhoto = Backbone.View.extend({
  initialize: function () {
    this.editor = null;
    this.image = null;

  },

  id: 'editor-container',

  template: JST['photos/new'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.addEditPane();
    return this;
  },

  addEditPane: function(){
    filepicker.makeDropPane(this.$('#file-upload'), {
      dragEnter: function() {
        this.$("#file-upload").html("Drop to upload").css({
          'backgroundColor': "#E0E0E0",
          'border': "1px solid #000"
        });
      },
      
      dragLeave: function() {
        this.$("#file-upload").html("Drop files here").css({
          'backgroundColor': "#F6F6F6",
          'border': "1px dashed #666"
        });
      },

      onSuccess: function(Blobs) {
        var url = Blobs[0].url;
        console.log(url);
      },
      onError: function(type, message) {
        this.$("#local-drop-result").text('('+type+') '+ message);
      },

      onProgress: function(percentage) {
        this.$("#file-upload").text("Uploading ("+percentage+"%)");
      }
    });
  }
});
