Kittenstagram.Views.NewPhoto = Backbone.View.extend({
  initialize: function () {
    this.editing = false;
    this.editor = null;
  },

  id: 'editor-container',

  template:  JST['photos/new'],

  events: {
    'click #file-upload': 'fileUploadClick',
    'change #file-source': 'handleFile',
    'click #upload': 'upload',
  },

  render: function () {
    var view = this;
    var content = this.template();
    this.$el.html(content);

    if (this.editing) {
      this.editor = new ImageEditor({
        selector: 'editor', 
        base64Image: view.image,
      });
    }

    return this;
  },

  handleFile: function (event) {
    
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {
      view.image = this.result;
      view.editing = true;
      debugger;
      view.render();
    };

    reader.readAsDataURL(file);
  },

  upload: function (event) {
    event.preventDefault();
    var view = this;

    this.editor.saveImage(function (base64Image) {
      var attrs = $('#editor-form').serializeJSON();
      attrs.image = base64Image;
      view.model.save(attrs, {
        success:function(){
          console.log("meow!")
        },
        error: function(){
          console.log("nope")
        }
      });
    });
  },


});
