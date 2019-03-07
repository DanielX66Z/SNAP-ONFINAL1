***SNAP-ON*** 

***Aplicacion prototipo ecommerce para snap-on ***

Para poder ejecutar la aplicacion se necesita 
	1- Instalar node.js.
	2- Instalar el cli de ionic.
	3- Tener instalado android studio SDK.
	4- Instalar cordova.

para poder ejecutar la aplicacion en la terminal de windows o linux ejecutar el comando
npm install
Esto descargara todas las dependecias con el fin de poser ejecutable el proyecto
Para ejecutar usar el comando ionic serve 

Para sacar un apk en modo debug usar 
ionic cordova platform add android (Este agrega la plataforma para construir)

ionic cordova build android (Este genera el build para android en modo debug)

Si usa release necesitara una llave desde la play store

mas documentacion aqui https://ionicframework.com/docs/v3/


***Guia rapida para desplegar apps en Firebase***

1.Crear una cuenta en Google Firebase

2.Crear un proyecto en Firebase

3.Ir a la consola de administracion en Firebase, y seleccionar "Hosting", es aqui donde se deployara la app

4.Una vez creado el host, en una terminal, ubicarse en la ruta root del proyecto Ionic y ejecutar:

$npm install -g firebase-tools

con esto, se instalara de forma global las herramientas de firebase

5.Autenticarse con las credenciales de Firebase que ya tenemos (si ya estamos logueados desde el navegador, al ejecutar el siguiente comando, se 
autenticara inmediatemente, sino, escribir las credenciales)

$firebase login

seguido de:

$firebase init

se mostraran diferentes opciones en la consola, seleccionar la opcion "hosting"

6.Esto creara un archivo "firebase.json" en la raiz del proyecto, editarlo, y setear el directorio del hosting
de la siguiente manera:
 "public": "www"

Hasta este momento, se ha configurado basicamente el hosting, los siguientes pasos se realizaran cada vez que 
se desee desplegar el proyecto

7. ejecutar

$npm run build

8. ejecutar

$firebase deploy

La aplicacion sera deployada, se mostrara en consola el link de la misma, ya en firebase.


