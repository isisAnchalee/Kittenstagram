Kittenstagram.Views.NewPhoto = Backbone.View.extend({

  initialize: function () {
    this.editor = null;
  },

  id: 'editor-container',

  template: JST['photos/new'],

  events: {
    'click #image-upload': 'onImageUploaded',
    'change #image-source': 'onImageInput',
    'click #upload': 'onSubmitUpload',
    'click #cancel': 'onCancelUpload',
    'click .filter': 'onApplyFilter',
    'change input[type=range]': 'onAdjustmentChange',
    'click #reset': 'onResetAll'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.editing) {
      this.editor = new ImageEditor({
        selector: 'editor', 
        base64Image: this.image,
        onInitialized: function () {
          // set our default value on the size slider to the scaled to fit
          $('#size-slider').attr('data-default', this.scale).val(this.scale);
        },

        onRenderBegin: this.disableControls.bind(this),
        onRenderEnd: this.enableControls.bind(this)
      });
    }

    return this;
  },

  onImageUploaded: function (event) {
    var $image = $('#image-source');
    $image.click();
  },

  onImageInput: function (event) {
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {
      view.image = this.result;
      view.editing = true;
      view.render();
    };

    reader.readAsDataURL(file);
  },

  onSubmitUpload: function (event) {
    event.preventDefault();

    this.disableControls();

    var view = this;

    this.editor.saveImage(function (base64Image) {
      var attrs = $('#editor-form').serializeJSON();
      attrs.source = base64Image;

      var $loading = $('<div>').addClass('blackout animated fadeIn');
      var $text = $('<h1>').addClass('blackout-text animated bounceInDown')
                           .text('Uploading...');

      $loading.append($text);
      $('html').append($loading);
      
      view.model.save(attrs, {
        success: function (model) {
          $text.removeClass('animated bounceInDown').addClass('animated tada');
          $text.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (event) {
            $text.removeClass('animated tada').addClass('animated bounceOutUp');
            $text.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (event) {
              $loading.removeClass('animated fadeIn').addClass('animated fadeOut');
              $loading.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (event) {
                Backbone.history.navigate('#/view/' + model.id);
                $loading.remove();
              });
            });
          });
        },
        error: function () {
          $loading.remove();
          this.enableControls();
        }
      });
    });
  },

  onCancelUpload: function (event) {
    event.preventDefault();

    this.editing = false;
    this.editor = null;
    this.render();
  },

  onApplyFilter: function (event) {
    event.preventDefault();

    if (this.enabled) {
      var name = $(event.target).data('name');

      if (name === 'none') {
        this.editor.resetFilter();
      } else {
        this.editor.applyFilter(name);
      }
    }
  },

 onAdjustmentChange: function (event) {
   if (this.enabled) {
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
   }
  },

  onResetAll: function (event) {
    event.preventDefault();

    this.$('input[type=range]').each(function (id, el) { 
      el.value = $(el).data('default');
    });

    this.editor.resetAll();
  },

  disableControls: function () {
    this.setEnabled(false);
  },

  enableControls: function () {
    this.setEnabled(true);
  },

  setEnabled: function (value) {
    this.enabled = value;
    
    this.$('input').prop('disabled', !value);
    if (value) {
      this.$('.filter-preview').removeClass('disabled-preview');
    } else {
      this.$('.filter-preview').addClass('disabled-preview');
    }
  }
});
