# Código base para la manipulación de colores en una imagen

## Estructura
El código está dividido en tres partes:

### img-crypter.js
Acá se encuentra el manejo de toda la funcionalidad de la carga y procesado de las imagenes.
Este objeto expone diferentes funciones que nos permiten acceder a la información que necesitamos.

### main.js
En éste módulo manejamos los eventos particulares de nuestra implementación. Entre otras cosas, acá se definen las llamadas que haremos a imgCrypter en función a los eventos del navegador (por ejemplo, al hacer un 'submit' en la carga de la imagen).

### custom.js
Este es el archivo donde se escribirá la solución particular de la práctica

## Como utilizar la librería
img-crypter.js expone como variable global el objeto `imgCrypter`, el cual a su vez expone una serie de funciones que nos permitirán operar sobre una imagen determinada.

Para comenzar, podemos "colgarnos" de la función `imgCrypter.ready()` de la siguiente manera

```javascript
imgCrypter.ready = function (imageData) {
   // Este código se ejecuta una vez que la imagen se cargó y
   // tenemos disponible en imageData la información "cruda" de la imagen
}
```

### Obtener la información de un determinado píxel
Para ésto tenemos el método `getPixel(x, y)` que nos devuelve la información de un píxel determinado.
Como vimos antes, podemos llamarlo una vez que tenemos la imagen cargada y lista para ser procesada:

```javascript
imgCrypter.ready = function (imageData) {
   var pixelInfo = this.imageData(100, 150);
}
```
Nótese la referencia a `this`. En éste caso, ya estamos dentro del contexto de `imgCrypter`, por lo que podemos acceder a todas sus variables/funciones usando ésta referencia.

Dentro de `pixelInfo` en el ejemplo, obtendremos la siguiente información del píxel solicitado:
```javascript
{
  r: 255,
  g: 100,
  b: 58
}
```
