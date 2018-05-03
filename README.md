# Código base para la manipulación de colores en una imagen

## Estructura
El código está dividido en tres partes:

### img-crypter.js
Acá se encuentra el manejo de toda la funcionalidad de la carga y procesado de las imágenes.
Este objeto expone diferentes funciones que nos permiten acceder a la información que necesitamos.

### main.js
En éste módulo manejamos los eventos particulares de nuestra implementación. Entre otras cosas, acá se definen las llamadas que haremos a imgCrypter en función a los eventos del navegador (por ejemplo, al hacer un 'submit' en la carga de la imagen).

### custom.js
Este es el archivo donde se escribirá la solución particular de la práctica

## Como utilizar la librería
img-crypter.js expone como variable global el objeto `imgCrypter`, el cual a su vez expone una serie de funciones que nos permitirán operar sobre una imagen determinada.

### Obtener la información de un determinado píxel
Para ésto tenemos el método `getPixel(x, y)` que nos devuelve la información de un píxel para una coordenada determinada.

```javascript
  var pixelInfo = imgCrypter.getPixel(100, 150);
```

Dentro de `pixelInfo` en el ejemplo, obtendremos la siguiente información del píxel solicitado (en adelante definiremos un `color` de ésta forma):
```javascript
{
  r: 255,
  g: 100,
  b: 58
}
```

### Modificar un determinado píxel
Para modificar un píxel particular, tenemos el método `setPixel(x, y, color)` donde `color` es de la forma que mencionamos anteriormente.

`setPixel()` no escribe directamente sobre la imagen, sino que hace los cambios en memoria. Para aplicar los cambios en la imagen, debemos llamar a `imgCrypter.applyChanges()`.

#### Ejemplo
```javascript
for(var i = 10; i <= 200; i++) {
  for(var j = 0; j <= 50; j++) {
    imgCrypter.setPixel(i, j, { r: 255, g: 0, b: 0 }); // Cambio el pixel i, j a 100% rojo
  }
}
imgCrypter.applyChanges();
```

Como vemos en el ejemplo, dibujamos dentro de la imagen un rectangulo rojo que va desde (10, 0) hasta (200, 50).
Primero escribimos el rectángulo en memoria recorriendo toda la superficie. Luego de tener los cambios listos, aplicamos los cambios a la imagen llamando a `applyChanges()`

# Implementación para el ejercicio
- La idea es encriptar un mensaje dentro de una imagen modificando el bit menos significativo (LSB) de cada color que compone cada píxel. De esta forma la imagen no presenta cambios ante el ojo humano pero es capaz de almacenar un mensaje en ella.

- Dentro del archivo `custom.js`, dejamos declarada la función `insertMessageAction(message)` la cual se ejecutará al hacer click en el botón que inserta el mensaje ingresado.
Como vemos, esta función ya recibe como parámetro el mensaje ingresado en el textarea.

```javascript
function insertMessageAction(message) {
  for(var i = 10; i <= 200; i++) {
    for(var j = 0; j <= 50; j++) {
      imgCrypter.setPixel(i, j, { r: 255, g: 0, b: 0 });
    }
  }
  imgCrypter.applyChanges();
}
```

- También se encuentra declarada la función `getMessageAction()`, la cual retornará el mensaje que se encuentra en la imagen. Este mensaje se visualizará automáticamente en el textarea.

- Recomendamos usar una marca de inicio y otra de fin para poder detectar el comienzo y el final de un mensaje. De esta forma podemos:
  - Saber rápidamente si una imagen tiene o no un mensaje dentro (ya que lo primero que debemos encontrar es la marca de inicio).
  - Saber también cuándo el mensaje está completo (evitandonos recorrer toda la imagen y leer basura).
  - Ej: 2 bytes para el inicio -> `'@@'` y dos bytes para el final -> `'##'`

- Funciones útiles:
  - `Math.pow(base, exponente);` => eleva la base al exponente dado.
  - `String.fromCharCode(code);` => devuelve el caracter correspondiente al código ASCII dado.

### Funciones Adicionales
- `getDimensions()` retorna las dimensiones de la imagen con el siguiente formato:
```javascript
var dimensions = imgCrypter.getDimensions();

{
  width: 720,
  height: 485
}
```

- `stringToBinary()` convierte un string de entrada en binario. Lo devuelve como otro string.
```javascript
imgCrypter.stringToBinary('hola'); // retorna '01101000011011110110110001100001'
```