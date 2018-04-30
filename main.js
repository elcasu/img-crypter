(function (imgCrypter) {
  var canvas = document.getElementById('preview-canvas');
  var downloadButton = document.getElementById('download-button');
  var imageInput = document.getElementById('image-input');

  imgCrypter.setCanvas(canvas);

  imageInput.addEventListener('change', function (event) {
    event.preventDefault();
    if (imageInput && imageInput.files && imageInput.files.length) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = function (e) {
        imgCrypter.loadCanvas(e.target.result);
        downloadButton.setAttribute('style', 'display: inline');
      }
    }
  });

  downloadButton.addEventListener('click', function (event) {
    event.preventDefault();
    imgCrypter.download('result.jpg');
  });

  return this;
})(imgCrypter);
