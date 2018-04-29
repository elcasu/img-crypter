imgCrypter.ready = function (imageData) {
  for(var i = 10; i < 200; i++) {
    for(var j = 0; j < 50; j++) {
      this.setPixel(i, j, { r: 255, g: 0, b: 0 });
    }
  }
  this.applyChanges();
}

