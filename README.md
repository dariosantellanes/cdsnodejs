# cdsnodejs

Para correr la aplicación se deberá ejecutar el comando:

npm start

Al iniciar la aplicación se creará un archivo llamado “cdsnodejs.db” el cual está definido en el archivo .env.

Este archivo es una base de datos en disco el cual es utilizado por la librería sqlite3, el cual contiene las tablas de películas, usuarios y tokens de autenticación requeridos por la aplicación.

Por defecto la aplicación corre en el puerto 2020, pero esto puede ser modificado en el archivo .env que se encuentra en el “root” en al cual están los archivos de la aplicación.

Los endpoints definidos son los siguientes:

/api/login POST
/api/logout POST
/api/users POST
/api/movies GET
/api/movies/favorites POST/GET

Cualquier otra operacion sera rechazada con código 404

Se incluye además una colección de Postman y el archivo de variables de entorno, estos son:

cdsnodejs.postman_collection.json -- coleccion de postman
cdsnodejsenv.postman_environment.json -- environment para ejecutar la coleccion

El environment tiene precargado por defecto la url como localhost y puerto 2020, estos pueden ser cambiados pero tambien se debera modificar el archivo .env con los mismos valores

Se deberán importar ambos archivos y seleccionar el environment importado para ejecutar la colección.

Debido que no existen endpoints para deshacer los cambios producidos a la db, se deberá borrar el archivo de db “cdsnodejs.db” y reiniciar la app cada vez que se quiera correr la colección.


