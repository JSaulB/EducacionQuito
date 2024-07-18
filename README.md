# Creación de un proyecto para la gestión del sistema educativo

SPRINT 0 

Estructura del proyecto del backend 

Para este proyecto, se utiliza como herramientas: 

Visual Code Studio 

Node.js 

MongoDB 

Preparando el ambiente de desarrollo. 

Para esto se crea una carpeta en la cual se trabajará, posteriormente se abre VS Code. 

 ![image](https://github.com/user-attachments/assets/855181d8-74a2-45c9-bd26-b6bcf6a14089)

Se abre la terminal dentro de VS Code, y se inicializa el proyecto, con el comando “npm init --y”, esto sirve para crear un archivo “package.json”, donde se guardarán todos los datos relacionados con el proyecto. 

 ![image](https://github.com/user-attachments/assets/76781094-eaf0-4401-af84-57784b1c99bd)


![image](https://github.com/user-attachments/assets/62435115-ced0-4883-ac5b-16d751abba13)


Y dentro de ”package.json” se procede a cambiar el tipo, de ”commonsjs” a” module”.  

Esto sirve para tener mejor compatibilidad con las nuevas herramientas y para tener un código mucho más limpio y legible.  

 ![image](https://github.com/user-attachments/assets/df47fb89-90d6-4e01-92fa-a12e7b4cf071)


Fig 4 - Archivo main 

Ahora se crean diferentes archivos que se utiliza para la realización del proyecto, 

Primeramente, se crea una carpeta llamada src y dentro de ella, se crean diferentes carpetas como, por ejemplo, modelos, controladores, rutas o middlewares, al igual que crear archivos database.js, index.js, server.js 

Y fuera de la carpeta src 

Crear .env, .gitignore, .env.example 

 

![image](https://github.com/user-attachments/assets/bd8b6640-c56c-494f-ae41-5ee7fb0e5a51)


Para el proyecto también es importante descargar ciertos paquetes para el correcto desarrollo del proyecto. 

-Elaboración de la Base de Datos (Realizar el deploy utilizando MongoBD Atlas)  

Como base de datos, se utiliza MongoDB por lo que debemos instalarlo.  

 ![image](https://github.com/user-attachments/assets/d5cefe26-7341-4191-b585-b87536575aff)



Para la conexión con MongoDB se tiene que descargar el paquete mongoose 

En mongoDB se crea un nuevo cluster  

Y en el cluster creado se aplasta el botón “conectar” 

 ![image](https://github.com/user-attachments/assets/77a80946-a466-42ea-95d6-2b596dd7e146)



Aparecerá esta pantalla, para conectar con la aplicación,  

 ![image](https://github.com/user-attachments/assets/b2cfba11-a02a-4b65-9efb-04dfc17e49a4)



Se crea un código que se debe pegar en VS Code que permite la conexión con mongoDB 

 
![image](https://github.com/user-attachments/assets/0e104617-5074-4808-a5e7-a3a932aaa97e)

Y dentro de database.js, realizamos la conexión con mongoDB. 

![image](https://github.com/user-attachments/assets/90ec114c-5361-4c10-b9d8-502f09982ebc)

 ![image](https://github.com/user-attachments/assets/e52957ce-1e52-47cf-8a71-f0d36e984fc9)


SPRINT 1 

Se procede a trabar en el módulo Administrador como el sprint 1, en este caso se tiene lo siguiente:
Creación del modelo
Se define un esquema y un modelo de administrador utilizando Mongoose, una biblioteca para manejar bases de datos MongoDB en Node.js. También emplea bcrypt para cifrar y verificar contraseñas. Primero, importa Schema y model de Mongoose, junto con bcrypt para manejar las contraseñas. Luego, crea un esquema de administrador (adminSchema) que especifica varios campos: nombre, apellido, direccion, telefono, email, password, status, token, y confirmEmail, cada uno con su tipo de dato y restricciones, como requerir que email sea único y que nombre, apellido, email, y password sean obligatorios.
 
![image](https://github.com/user-attachments/assets/c590b94a-5def-4a8e-9afd-7df17af15aba)

El esquema incluye tres métodos. El método encrypPassword cifra una contraseña generando una sal con bcrypt y usando esa sal para cifrar la contraseña. El método matchPassword compara una contraseña proporcionada con la almacenada en la base de datos para verificar si coinciden. El método crearToken genera un token aleatorio y lo asigna al campo token del administrador. Finalmente, el estudiante exporta el modelo de administrador basado en el esquema definido, permitiendo interactuar con la colección de administradores en la base de datos MongoDB.
 
![image](https://github.com/user-attachments/assets/1ac5ac33-f1fc-4bbd-9af2-93c9f32cccff)

El primer esquema, institucionSchema, establece la estructura de los datos para las instituciones educativas, especificando que deben tener un nombre, una calificación (con valores permitidos 'A', 'B', 'C'), y un historial socioeconómico (con valores permitidos 'Alto', 'Medio', 'Bajo'). Todos estos campos son obligatorios y se les quitarán los espacios en blanco al principio y al final. Además, se añaden automáticamente campos de marca temporal (createdAt y updatedAt) para registrar cuándo se creó y actualizó el documento. El segundo esquema, estudianteSchema, define la estructura de los datos para los estudiantes, incluyendo su nombre, apellido, la institución a la que asisten, y su historial socioeconómico, todos ellos obligatorios y con los mismos tratamientos de espacios en blanco y valores permitidos para el historial socioeconómico que en el institucionSchema. También se incluyen las marcas temporales para los documentos de estudiantes. Estos esquemas aseguran que los datos almacenados en la base de datos tengan una estructura coherente y cumplan con ciertos requisitos.
 
 
![image](https://github.com/user-attachments/assets/4b05b9c5-ae28-45e5-8d7c-38bb8289aaf7)
![image](https://github.com/user-attachments/assets/86b0a4f0-2c62-40e5-be73-c102dc310ff7)

Creación de las rutas:
Se configura un enrutador en un módulo de administrador utilizando Express, un framework web para Node.js. Importa funciones del controlador admin_controller.js para manejar diversas operaciones como inicio de sesión, registro, confirmación de email, gestión de administradores, actualización de perfil y contraseña, y recuperación de contraseña. Además, utiliza un middleware autenticacion.js para verificar la autenticación del usuario en ciertas rutas.

![image](https://github.com/user-attachments/assets/8f8c1b3a-5fb4-4e1d-8ca7-46cd17fede39)

Métodos del controlador:
En el módulo de controladores para administradores de una aplicación Node.js utilizando Express y MongoDB con Mongoose, el estudiante gestiona diversas funciones clave. Estas incluyen la autenticación de administradores mediante validaciones rigurosas de email y contraseña, el registro de nuevos administradores con cifrado seguro de contraseñas y confirmación por email, así como operaciones para actualizar perfiles, contraseñas y realizar recuperación de contraseñas mediante tokens. Cada función asegura el manejo adecuado de datos sensibles, respuestas HTTP claras y el uso eficiente de operaciones asincrónicas para interactuar con la base de datos MongoDB.
 
![image](https://github.com/user-attachments/assets/628b6253-43e9-43dc-b2a6-2457df1fea61)

![image](https://github.com/user-attachments/assets/4a5fda38-42df-471d-90c6-079f01e8b29f)

 
![image](https://github.com/user-attachments/assets/71231e4b-de41-4350-8be0-730a3061c700)


Crear JWT:
Se importa los módulos jsonwebtoken y dotenv para gestionar tokens JWT y cargar variables de entorno, respectivamente. La función generarJWT toma un id y un rol como parámetros, y utiliza jwt.sign para firmar un token JWT con estos datos, usando una clave secreta definida en la variable de entorno JWT_SECRET.
 
![image](https://github.com/user-attachments/assets/735550a1-45cd-49e5-851d-a9e62d41e120)

Autenticación:
Se ha desarrollado un middleware en Node.js utilizando Express para verificar la autenticación de administradores mediante tokens JWT. Importando los módulos necesarios como jsonwebtoken, dotenv para gestionar variables de entorno, y el modelo administrador para consultar la base de datosel middleware verificarAutenticacion.
 
![image](https://github.com/user-attachments/assets/a221ddf1-945f-422f-9397-eb53fd2135a5)


Registro y envió de email:
Se probará el registro y el email de email mediante el thunder client.
 
![image](https://github.com/user-attachments/assets/b84076c0-2343-4354-a16f-22d6978a510c)

 ![image](https://github.com/user-attachments/assets/a4bd234b-7284-42b2-ac46-6111cac1f1b6)

Como podemos observar el registro fue éxito y se tiene que verificar el correo para poder seguir con el registro,
 
![image](https://github.com/user-attachments/assets/5ceecc43-2b96-4d27-afe6-12cfbaab5491)

Se registra en la base de datos de mongo compas como se puede observar y también en el correo ya se tiene el email para confirma la cuenta
 
![image](https://github.com/user-attachments/assets/e356e136-7058-4cd3-9ff2-84bff455ae6c)

Y por último al hacer click ya se confirma la cuenta para su debido registro y genera un token
 
![image](https://github.com/user-attachments/assets/df3ab87d-bec3-472a-9ef8-a7e27c88b408)



SPRINT 2 
Tareas a realizar: 

Endpoint para el login (para que el Ministerio ingrese a su cuenta) 

Endpoint para visualizar detalle de las instituciónes y sus categorías empezando desde la más alta siendo “A” la más baja siendo “E. 

Endpoint para listar estudiantes y sus calificaciones. 

Registrar ayuda a la institución elegida y a los niños con las notas más altas para entrega de becas. 

Directorio Models: Se crea un archivo models.js dentro del cual se implementa la lógica donde se definen los esquemas y modelos para cuatro colecciones diferentes en una base de datos MongoDB: “Institución”, “Alumno”, “Ayuda”. “User”. Además de definen dos métodos para el esquema “userSchema” :  

encryptPassword: Método para cifrar la contraseña del usuario utilizando bcrypt. 

matchPassword: Método para verificar si la contraseña ingresada coincide con la almacenada en la base de datos. 

![image](https://github.com/user-attachments/assets/16362f55-0d60-41d9-a53d-927f56fc37c7)

![image](https://github.com/user-attachments/assets/9ccf420a-896b-4029-81eb-343455df27d3)

Directorio Controller: Se implementan varios endpoints para una aplicación de gestión de instituciones, alumnos y ayudas, además de manejar la autenticación de usuarios. Este código define y exporta cuatro funciones que representan diferentes enpoints de una API RESTFUL, Los endpoints permiten a los usuarios autenticarse, ver detalles de instituciones y estudiantes, y registrar ayudas financieras.


![image](https://github.com/user-attachments/assets/df15c387-8113-4cf5-9fdf-c85a1b9efcef)


Cada función interactúa con la base de datos MongoDb a través de los modelos definidos previamente, realizando operaciones como búsqueda, ordenamiento, y actualización de documentos. Además, se emplea bcrypt para la seguridad de las contraseñas y JWT para la autenticación de usuarios. 

![image](https://github.com/user-attachments/assets/4464535c-cc9e-449e-b1c8-93a3b86e7d9c)

![image](https://github.com/user-attachments/assets/65767378-607e-4863-b7ea-28e90492d3bd)


Directorio routers: En este código se define un conjunto de rutas y asocia cada ruta con un controlador correspondiente del archivo creado “ministerio_controller.js”, Al importar este router en el archivo principal de la aplicación, todas estas rutas estarán disponibles para manejar solicitudes HTTP correspondientes. 

![image](https://github.com/user-attachments/assets/75bc6538-2180-4c44-ad84-10cae4208755)


SPRINT 3 


  Tareas a realizar: 

Endpoint para registrarse como nuevo usuario. 

Endpoint para iniciar sesión en una cuenta como ciudadano. 

Endpoint para visualizar la calificación de una institución. 

Endpoint para solicitar una beca o ayuda. 

Endpoint para registrar a un estudiante en un colegio. 

Registrar y ver la calidad de diferentes instituciones y elegir la mejor opción. 

Desde el directorio models, se crea el nuevo archivo para el modelo ciudadano donde se define el esquema, los datos que le vamos a proporcionar: se necesita el nombre, apellido, email y contraseña; además de apuntar a la colección Institución. Además, con el uso de bcrypt se asegura que la contraseña se encripte y sea correcta, para finalmente exportar todo como un modelo. 

  ![image](https://github.com/user-attachments/assets/aa8be1b8-2a14-4bd2-95bd-cf7233711d30)

![image](https://github.com/user-attachments/assets/5d4220cd-3576-478b-b86e-2a2557a879fa)

En el directorio controllers, también se crea un nuevo archivo que tendrá toda la lógica para las funciones que tendrá un usuario como ciudadano. En el primer método crear un nuevo usuario, siguiendo el esquema se envía los datos requeridos y se guarda en la base de datos. 

![image](https://github.com/user-attachments/assets/094cbaa7-1a6e-4d99-b4ed-0311433355d4)

En el segundo método se reciben los datos que se envíen estén en la base de datos y se realiza la autenticación para generar un token. 

![image](https://github.com/user-attachments/assets/a4e7036c-4b54-44e9-9a47-31bafdd2bed3)

En el siguiente método se envían los datos de un niño especificando la institución para registrarlo como nuevo estudiante. 

También es posible ver la categoría en la que se encuentra cierta institución. 

![image](https://github.com/user-attachments/assets/20ecbd1e-6b22-4120-af06-39eca7d67c0c)

Un último método permitirá solicitar una ayuda, enviando los datos del estudiante del que se desea solicitar. 

![image](https://github.com/user-attachments/assets/97c20159-2a01-4ea6-a7e0-3be05e68692c)

Una vez realizado todos los métodos, usando router; establecemos las URL para cada una y le asignamos una verificación si así lo necesita. 


![image](https://github.com/user-attachments/assets/4c3d907c-5ec8-46b8-9f88-26a070684b7a)
