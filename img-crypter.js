var imgCrypter = (function () {
  var preview = {};

  function downloadImage (filename) {
    var base64Data = preview.canvas.toDataURL();
    var link = document.createElement('a');
    link.setAttribute('href', base64Data);
    link.setAttribute('download', filename);
    link.click();
  }

  function getOffset (x, y, width) {
    return ((y * (width * 4)) + (x * 4))
  }

  return {
    setCanvas: function (canvasElement) {
      preview.canvas = canvasElement;
      preview.context = preview.canvas.getContext('2d');
    },
    loadCanvas: function (data, cb) {
      var img = new Image();
      img.src = data;
      img.onload = function () {
        preview.canvas.setAttribute('width', img.width);
        preview.canvas.setAttribute('height', img.height);
        preview.context.drawImage(img, 0, 0);
        preview.width = img.width;
        preview.height = img.height;
        preview.imageData = preview.context.getImageData(0, 0, preview.width, preview.height);
        if (typeof this.ready === 'function') {
          this.ready(preview.imageData);
        }
      }.bind(this)
    },
    getPixel(x, y) {
      var offset = getOffset(x, y, preview.imageData.width);
      return {
        r: preview.imageData.data[offset],
        g: preview.imageData.data[offset + 1],
        b: preview.imageData.data[offset + 2]
      };
    },
    setPixel(x, y, color) {
      var offset = getOffset(x, y, preview.imageData.width);
      preview.imageData.data[offset] = color.r;
      preview.imageData.data[offset + 1] = color.g;
      preview.imageData.data[offset + 2] = color.b;
    },
    applyChanges: function () {
      preview.context.putImageData(preview.imageData, 0, 0);
    },
    download: function (filename) {
      downloadImage(filename)
    }
  };
})();
