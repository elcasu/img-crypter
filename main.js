(function (imgCrypter) {
  imgCrypter.setCanvas(document.getElementById('preview-canvas'));

  document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var imageInput = document.getElementById('image-input');
    if (imageInput && imageInput.files && imageInput.files.length) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = function (e) {
        imgCrypter.loadCanvas(e.target.result);
      }
    }
  });

  document.getElementById('download-button').addEventListener('click', function (event) {
    event.preventDefault();
    imgCrypter.download('vamoscarajo2.jpg');
  });

  return this;
})(imgCrypter);
