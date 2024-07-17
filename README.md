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
