Kittenstagram.Views.NewPhoto = Backbone.View.extend({
  initialize: function () {
    this.editing = false;
    this.editor = null;
    $('body').css('background-color', '#edeeef');
  },

  id: 'editor-container',

  template:  JST['photos/new'],

  events: {
    'change #file-source': 'handleFile',
    'click .filter': 'layerFilter',
    'click #upload': 'upload',
    'click #cancel': 'cancelUpload',
    'change input[type=range]': 'makeAdjustment',
    'click #reset': 'resetAll'
  },

  render: function () {
    var view = this;
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderEditor: function () {
    this.editor = new ImageEditor({
      selector: 'editor', 
      base64Image: this.image,
      onInitialized: function () {
        $('#size-slider').attr('data-default', this.scale).val(this.scale);
      }
    });
  },

  handleFile: function (event) {
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {
      view.image = this.result;
      view.editing = true;
      view.renderEditor();
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
        },
        error: function(model, resp){
          console.log(model);
          console.log(resp)
        }
      });


    });
  },

  cancelUpload: function (event) {
    event.preventDefault();
    this.editor = null;
    this.editing = false;
    this.render();
  },

  layerFilter: function (event) {
    event.preventDefault();

    var filt = $(event.target).data('filt');
    if (filt === 'none') {
      this.editor.resetFilter();
    } else {
      this.editor.applyFilter(filt);
    }
  },

 makeAdjustment: function (event) {
    var name = event.target.name;
    var weight = event.target.value * 1;
    var defaultWeight = $(event.target).data('default') * 1;

    if (name === 'size') {
      this.editor.setScale(weight);
    } else if (name === 'rotate') {
      this.editor.setRotation(weight);
    } else {
      this.editor.applyAdjustment(name, weight, defaultWeight);
    }
  },

  resetAll: function (event) {
    event.preventDefault();

    this.$('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.editor.resetAll();
  }
});