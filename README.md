# Manual Técnico

### TASKPLANNER
Es una plataforma web enfocada en la organización académica, donde el usuario contará con un dashboard principal que incluye un calendario interactivo y la posibilidad de crear y gestionar cursos personalizados. Dentro de cada curso, el estudiante podrá almacenar archivos, crear tareas con fechas específicas, y registrar notas importantes relacionadas al contenido del curso, la plataforma contará con un apartado para la traducción de documentos en diferentes idiomas utilizando AWS Translate, con el fin de facilitar el acceso a contenidos en otros idiomas.

---

## Integrantes
|             Nombre             |   Carnet  |
| :----------------------------  | :------   |
| Henry Gabriel Peralta Martinez | 201712289 |
| Brando Iván Muñoz Debroy       | 201700890 |
| Diego Abraham Robles Meza      | 201901429 |
| Oscar David Padilla Vásquez    | 202103250 |
| Pablo Jose Oliva Bonilla       | 201700898 |

---

## Arquitectura

La aplicación de TASKPLANNER se desplegó utilizando servicios de **AWS** estas implementaciones siguen la misma arquitectura de dos capas: una web estática consumiendo servicios desde backend con balanceo de carga.

### AWS
- IAM: Creación de roles y políticas específicas por servicio.
- EC2: Dos instancias para backend en NodeJS y Python.
- ELB: Balanceo de carga entre las instancias EC2.
- S3: Almacenamiento de archivos estáticos y archivos de usuario.
- RDS: Base de datos para gestión de usuarios y tareas.
- Lambda: Funciones serverless para cargar archivos.
- API Gateway: Exposición de funciones serverless vía HTTP.
- Rekognition: Reconocimiento de imagenes.
- SES: Envio de notificaciones al correo.
- Polly: Generación de voz con IA.
- Translate: Traducción de textos a otro idioma.

---

## Usuarios IAM (AWS)

A continuación, se describen los usuarios IAM creados, sus roles y políticas asignadas:

### Usuario S3
- **Políticas:**
  - `AmazonS3FullAccess`
  - `LambdaInvokeFunction`
  - `APIGatewayInvokeFullAccess`

### Usuario EC2
- **Políticas:**
  - `AmazonEC2FullAccess`
  - `AmazonRDSFullAccess`

---

## Capturas de Pantalla

#### Buckets de Amazon S3
![S3 Bucket](/IMG/S3.jpeg)

#### Instancias de EC2
![EC2 Instances](/IMG/EC2.jpeg)

#### Balanceador de Carga (ELB)
![Load Balancer](/IMG/elb.jpeg)

#### Base de Datos (RDS)
![RDS](/IMG/BD.jpeg)

#### Funciones Lambda
![Lambda](/IMG/funciones.jpeg)

#### API Gateway
![API Gateway](/IMG/archivos_node.jpeg)

![API Gateway](/IMG/cargar_node.jpeg)

---

## Conclusiones
s

---

# Manual de Usuario
En este apartado se muestran imagenes del funcionamiento que tiene la aplicación con los servicios desplegados en la nube, el manual sirve como guia para el usuario para su funcionamiento.

---
### Login
![](/IMG/Login.png)
S

---
### Register
![](/IMG/Register.png)
S

---
### Calendario
![](/IMG/Calendario.jpg)
En este apartado el usuario puede crear sus recordatorios de actividades para tal fecha, al crear una tarea al usuario se le notificará al correo que una tarea fue creada.

---
### Archivos
![](/IMG/Archivos.jpeg)
S

---
### Traductor
![](/IMG/Traductor.jpeg)
S