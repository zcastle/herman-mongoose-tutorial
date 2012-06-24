herman-mongoose-suggestion
==========================

Simple ejemplo de como usar la mezcla de express con mongoose (mongoDB librería) para interactuar de manera CRUD con un objeto.

# Disclaimer

Quiero hacer un _stress_ en la idea que esto es una *sugerencia* de como atacar el problema de interactuar de manera CRUD con un objeto usando las liberías de node.sj expressjs y mongoosejs; No un "Ud siempre debe hacerlo asi"

# Prerequisitos

Para que el ejemplo funcione debemos tener en nuestra maquina de desarrollo (idealmente en sus últimas versiones). Se dejan las respectivas instalaciones como ejercicio al lector.

* Node.js
* MongoDB
* ExpressJS
* Mongoose

# Preliminares - Diseño

Una manera rapida de partir es definiendo el vector en dos dimensiones: La definición del objeto (modelo) y las rutas web que queremos usar para "hablar" con él.

## Modelo del Objeto

En este ejemplo usaré productos de un supermercado, cada producto tendrá un nombre, descripción y precio, y sus tipos de datos serán respectivamente: nombre, descripción y precio. 

Creemos un archivo /models/producto.js (Hint: Todos nuestras representaciones de objectos de datos irán en este directorio)

Usemos el siguiente código:

````javascript
var Schema = require('mongoose').Schema

var producto_schema = new Schema({
  nombre        :   String,
  descripcion   :   String,
  precio        :   String
})

module.exports = producto_schema
````
En sintesís, le estamos diciendo a nodejs que vamos a crear un objeto de mongoose de tipo `Schema` donde cada documento usa los campos `nombre`, `descripcion` y `producto`, junto a sus respectivos tipos. La última línea es vital para que podamos usar el código del archivo fuera de este (i.e.: Que este sea llamado por el programa app.js que lo va a ejecutar).

Como estamos testeando, démosle algunos documentos a mongoDB vía su consola, nuestra base de datos se llamará supermercado.

````bash
$ mongo
MongoDB shell version: 2.0.4
connecting to: test
> use supermercado
switched to db supermercado
> db.productos.update({},{ nombre: 'Papas Fritas', descripcion: 'Crujientes, sabor mediterraneo', precio: 2.5 }, true, false)
````
Aquí una pequeña explicación: La función update() en mongoDB es muy poderosa en el sentido que podemos hacer muchas cosas con ella. En este caso, le estamos diciendo: "Actualiza la colección productos, en todo su scope o todos sus elementos (primer parámetro `{}`), con el siguiente objeto ( { nombre...}, si no existe, creálo (true), y no lo hagas multiples veces (false)." Lo de las multiples veces, no tiene sentido acá, si tiene sentido cuando le digo "actualiza todas las papas fritas, incrementando su precio en +1".

Comprobemos si nuestro producto se guardó:

````bash
> db.productos.findOne()
{
  "_id" : ObjectId("4fe6454a8c136cf49721359f"),
  "nombre" : "Papas Fritas",
  "descripcion" : "Crujientes, sabor mediterraneo",
  "precio" : 2.5
}
````
Ese campo _id es nativo de mongoDB.

## Rutas Web de la Aplicación

Ahora que ya tenemos un objeto, y un documento que lo describe, es hora de diseñar rápidamente las rutas que queremos para operar en nuestra aplicación web. Empezemos por los conceptos: "Con mi aplicación web, yo a los productos quiero:"

* Listarlos
* Escoger uno y ve su descripción en detalle
* Editar un producto
* Eliminar un producto
* Crear uno nuevo

En verdad, podríamos hacer un diseño mayor, pero tenemos ideas claras de un modelo CRUD acá (Create, Read, Update, Delete), por lo que, y para hacer el tutorial breve, trabajaremos así.

Lo que sigue es gestar las rutas que harán estas actividades reales:

* Listarlos
    * `GET     /`
* Escoger uno y ver su descripción en detalle
    * `GET     /producto/:id`
* Editar un producto
    * `GET     /producto/:id`   (usaremos la misma ruta, pero guardaremos con...)
* Guardar un producto
    * `POST    /producto/:id`
* Eliminar un producto
    * `GET     /delete-producto/:id`
* Crear uno nuevo
    * `GET     /nuevo-producto`

Para los avanzados en Verbos HTTP, me podrían decir que la creación puede ser hecha con PUT, y el borrado con DELETE, en este tutorial, iremos muy básico, solo con GET y POST. Se invita desde luego toda pull request para hacer este tutorial más firme.

Con nuestras rutas claras, solo nos queda escribir el código, y es lo que haremos.

# Desarrollo de nuestra aplicación

### Ensayo inicial

El lector astuto dirá "Partamos por las rutas, ya que las definimos". La instalación de express tiene estas dos lineas en su archivo `app.js`:

````javascript
  var routes = require('./routes');

//...

app.get('/', routes.index);
````

Aquí le decimos a la aplicación, al principio, "Usa como módulo el archivo /routes/index.js (implícito) y referenciemoslo con la variable `routes`", luego le decimos "Cuando el usuario haga un GET, carga la función `index` en el módulo `routes`".

En esta parte empieza mi sugerencia propiamente tal, ya que borraremos estas líneas y crearemos nuestras funciones en `controladores' de manera de abrazar el modelo MVC (Model, View y Controller).

Crearemos, primero el archivo `/controllers/producto.js`. Este tendrá todos los _handlers_ (manejadores) de las rutas diseñadas, Escribamos las siguientes líneas para entender como funciona este sistema:

* En /controllers/producto.js

````javascript
exports.index = function (req, res, next) {

  res.send('Funciona!')
}
````

* Y, en /app.js

````javascript
// Al principio
var producto  = require('./controllers/producto')

//... Y despues del comentario // Routes
app.get('/', producto.index)

````

Nosotros, le estamos diciendo a express "Carga el módulo producto que está en `/controllers/producto.js`" y "Cuando el usuario haga un GET a `/` utiliza la función `index` la que vive en `producto.js`".

Está función no hace más que devolver el texto 'Funciona!'. Detengamos la ejecución de app.js, reiniemosla y hagamos la consulta:

(Ver imagen en http://cl.ly/233i1v1k3T2B1O16001o)

### La aplicación propiamente tal

/////// Work in Progress..


