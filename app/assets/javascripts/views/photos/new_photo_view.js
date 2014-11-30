Kittenstagram.Views.NewPhoto = Backbone.CompositeView.extend({
  template: JST['photos/new_photo'],

  events: {
    "submit form": "submit",
    "change #photo-file-input": "fileSelect",
    "click #sepiabtn": "addSepia",
    "click #brightnessbtn": "addBrightness",
    "click #noisebtn": "addNoise",
    "click #contrastbtn": "addContrast",
    "click #vintagebtn": "addVintage",
    "click #claritybtn": "addClarity",
    "click #retrobtn" : "addRetro"
  },

  initialize: function(){
    this.model = new Kittenstagram.Models.Photo();
    this.model.collection = this.collection;
  },

  render: function(){
  	var renderedContent = this.template({});
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  submit: function (event) {
      event.preventDefault();
      $(".photo-loading").fadeIn();

      var that = this;
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      var dataURL = canvas.toDataURL();
      var canvasImg = $('#canvasImg');
      canvasImg.attr("src", dataURL);

      this.model.set("filepicker_url", dataURL);
      console.log(" hi!!!!")

      this.model.save({}, {
        success: function () {
          that.collection.add(that.model);
          console.log("success!!")
          // Remove the image attribute with raw data
          // from the model after uploading it.
          delete that.model.attributes.filepicker_url;

        }
      })
    },

  fileSelect: function(event){
    var that = this;
    var imageFile = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(this.result);
    }

    if(imageFile){
      reader.readAsDataURL(imageFile);
    } else {
      this._updatePreview("");
    }
  },

  _updatePreview: function(imageData){
  window.imageData = imageData;
  window.originalImage = imageData;
    Caman(".preview", imageData, function () {

    $(".preview").css({"height":"500", "width": "500"})


      this.render();
    });

  },

  addSepia: function(e){
    e.preventDefault();
    Caman(".preview", window.imageData, function () {
      this.sepia(20);
      this.render();
    });

  },

  addBrightness: function(e){
    e.preventDefault();

    Caman(".preview", window.imageData, function () {
      this.brightness(10);
      this.contrast(0);
      this.render();
    });
  },

  addNoise: function(e){
    e.preventDefault();

    Caman('.preview', window.imageData, function(){
      this.noise(10);
      this.render();
    });
  },

  addContrast: function(e){
    e.preventDefault()
    Caman('.preview', window.imageData, function(){
      this.contrast(10);
      this.render();
    });
  },

  addVintage: function(e){
    e.preventDefault();

    Caman('.preview', window.imageData, function(){
      this.vintage();
      this.render();
    });

  },

  addClarity: function(e){
    e.preventDefault();

    Caman('.preview', window.imageData, function(){
      this.clarity();
      this.render();
    });
  },

  addRetro: function(e){
    e.preventDefault()
    Caman('.preview', window.imageData, function(){
      this.crossProcess();
      this.render();
    });
  }

});