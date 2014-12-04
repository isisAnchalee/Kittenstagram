ImageEditor = function (options) {
  this.adjustments = {};
  this.filter = null;
  this.scale = 1;
  this.onRenderBegin = options.onRenderBegin;
  this.onRenderEnd = options.onRenderEnd;
  this.onInitialized = options.onInitialized;

  this.initializeKinetic(options.selector);
  this.initializeCaman(options.base64Image);
};

ImageEditor.prototype.initializeKinetic = function (selector) {
  this.stage = new Kinetic.Stage({
    container: selector,
    width: 494,
    height: 494
  });

  this.background = new Kinetic.Rect({
    x: 0, 
    y: 0,
    width: 494,
    height: 494,
    fill: 'black'
  });
  
  this.backgroundLayer = new Kinetic.Layer();
  this.backgroundLayer.add(this.background);

  this.imageLayer = new Kinetic.Layer();

  this.stage.add(this.backgroundLayer);
  this.stage.add(this.imageLayer);
};

ImageEditor.prototype.initializeCaman = function ( base64Image) {
  this.camanCanvas = document.createElement('canvas');
  var context = this.camanCanvas.getContext('2d');

  this.image = new Image();
  this.image.onload = function () {
    this.camanCanvas.width = this.image.width;
    this.camanCanvas.height = this.image.height;

    context.drawImage(this.image, 0, 0);

    this.finalizeKinetic();

    this.setBackgroundColor('#000000');
    this.scaleToFit(this.image.width, this.image.height);
    this.center(this.image.width, this.image.height, this.scale);
    
    // Initialization complete, call our callback if we have one now!
    if (this.onInitialized) this.onInitialized();

    this.render({});
  }.bind(this);
  this.image.src = base64Image;
};

ImageEditor.prototype.finalizeKinetic = function () {
  this.kineticImage = new Kinetic.Image({
    x: 0,
    y: 0,
    image: this.camanCanvas,
    draggable: true
  });

  this.imageLayer.add(this.kineticImage);
};

/* This function takes an options hash, with valid options being:
 *  - revert: should the image be completely reset before adjusting again
 *  - filter: a filter to apply to the image
 *  - adjustments: a hash with the name of the adjustment and the strength
 */
ImageEditor.prototype.render = function (options) {
  if (this.onRenderBegin) this.onRenderBegin();

  options = options || {};
  var editor = this;

  Caman(this.camanCanvas, function () {
    if (options.revert) {
      this.revert(false);
    }

    if (options.filter) {
      this[options.filter]();
    }

    _.each(options.adjustments, function (weight, name) {
      this[name](weight);
    }.bind(this));

    this.render(function () {
      editor.kineticImage.rotation(editor.rotation);
      editor.imageLayer.scale(editor.getScale());
      editor.imageLayer.draw();

      if (editor.onRenderEnd) editor.onRenderEnd();
    });
  });
};

ImageEditor.prototype.scaleToFit = function (width, height) {
  var scale = 494 / (width < height ? width : height);
  this.setScale(scale);
};

ImageEditor.prototype.center = function (width, height, scale) {
  width *= scale;
  height *= scale;

  this.kineticImage.position({
    x: (494 - width) / 2,
    y: (494 - height) / 2
  });
};

ImageEditor.prototype.setScale = function (scale) {
  this.scale = scale;
  this.render();
};

ImageEditor.prototype.getScale = function () {
  return { x: this.scale, y: this.scale };
};

ImageEditor.prototype.setRotation = function (rotation) {
  this.rotation = rotation;
  this.render();
};

ImageEditor.prototype.setBackgroundColor = function (color) {
  this.background.fill(color);
  this.backgroundLayer.draw();
};

ImageEditor.prototype.applyFilter = function (name) {
  this.filter = name;

  this.render({
    revert: true,
    filter: this.filter,
    adjustments: this.adjustments
  });
};

ImageEditor.prototype.applyAdjustment = function (name, weight, defaultWeight) {
  var prevWeight = this.adjustments[name];

  if (weight === defaultWeight) {
    delete this.adjustments[name];
  } else {
    this.adjustments[name] = weight;
  }

  var currWeight = this.adjustments[name];
  var revert = (prevWeight && prevWeight !== currWeight);
  var adjustment = {};
  adjustment[name] = weight;

  this.render({
    revert: revert,
    filter: revert ? this.filter : null,
    adjustments: revert ? this.adjustments : adjustment
  });
};

ImageEditor.prototype.resetAll = function () {
  this.scaleToFit(this.image.width, this.image.height);
  // TODO: this doesn't affect the image at all, why?
  this.center(this.image.width, this.image.height, this.scale);

  this.adjustments = {};
  this.filter = null;
  this.render({ revert: true });
};

ImageEditor.prototype.resetFilter = function () {
  this.filter = null;

  this.render({
    revert: true,
    adjustments: this.adjustments
  });
};

ImageEditor.prototype.saveImage = function (callback) {
  this.stage.toDataURL({
    mimeType: 'image/jpeg',
    quality: 1,
    callback: callback
  });
};