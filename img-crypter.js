var imgCrypter = (function () {
  var preview = {};

  function downloadBase64Image (base64Data, filename) {
    var link = document.createElement('a');
    link.setAttribute('href', base64Data);
    link.setAttribute('download', filename);
    link.click();
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
      var offset = ((y * (preview.imageData.width * 4)) + (x * 4));
      return {
        r: preview.imageData.data[offset],
        g: preview.imageData.data[offset + 1],
        b: preview.imageData.data[offset + 2]
      };
    },
    download: function (filename) {
      if (preview.base64Data) {
        downloadBase64Image(preview.base64Data, filename)
      }
    }
  };
})();
