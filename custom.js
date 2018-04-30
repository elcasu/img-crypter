function insertMessageAction(message) {
  // Acá va el código que toma el mensaje y lo inserta en la imagen
  for(var i = 10; i <= 200; i++) {
    for(var j = 0; j <= 50; j++) {
      imgCrypter.setPixel(i, j, { r: 255, g: 0, b: 0 });
    }
  }
  imgCrypter.applyChanges();
}
