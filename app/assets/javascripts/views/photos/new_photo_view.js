Kittenstagram.Views.NewPhoto = Backbone.CompositeView.extend({
  template: JST['photos/new_photo'],

  events: {
    "submit form": "submit",
    "change #photo-file-input": "fileSelect"
  },

  initialize: function(){
    this.model = new Kittenstagram.Models.Photo();
    this.model.collection = this.collection;
  },

  render: function(){
  	var renderedContent = this.template({});
  	this.$el.html(renderedContent);
  	return this;
  },

  submit: function (event) {
      event.preventDefault();
      $(".photo-loading").fadeIn();

      var that = this;
      var formData = $(event.currentTarget).serializeJSON();

      this.model.save({}, {
        error: function () { alert("There was an error processing your request!") },
        success: function () {
          // that.collection.add(that.model);

          // Remove the image attribute with raw data
          // from the model after uploading it.
          delete that.model.attributes.image;

        }
      })
    },

  fileSelect: function(event){
    var that = this;
    var imageFile = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model.set("filepicker_url", this.result);
      that._updatePreview(this.result);
    }

    if(imageFile){
      reader.readAsDataURL(imageFile);
    } else {
      this._updatePreview("");
    }
  },

  _updatePreview: function(imageData){
    this.$el.find("#photo-image-preview").attr("src", imageData);
  }

});