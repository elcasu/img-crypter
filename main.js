(function (imgCrypter) {
  var canvas = document.getElementById('preview-canvas');
  var downloadButton = document.getElementById('download-button');
  var imageInput = document.getElementById('image-input');
  var msgWrapper = document.querySelector('.message-wrapper');
  var insertMessage = document.getElementById('insert-message');

  imgCrypter.setCanvas(canvas);

  imageInput.addEventListener('change', function (event) {
    event.preventDefault();
    if (imageInput && imageInput.files && imageInput.files.length) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = function (e) {
        imgCrypter.loadCanvas(e.target.result);

        // display elements that needs image to be loaded
        // so they are usable
        downloadButton.setAttribute('style', 'display: inline');
        msgWrapper.setAttribute('style', 'display: block');
      }
    }
  });

  downloadButton.addEventListener('click', function (event) {
    event.preventDefault();
    imgCrypter.download('result.jpg');
  });
  
  insertMessage.addEventListener('click', function (event) {
    var message = msgWrapper.querySelector('textarea').value;
    insertMessageAction(message);
  });

  return this;
})(imgCrypter);
