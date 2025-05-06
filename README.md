# Manual Técnico

## Integrantes
|             Nombre             |   Carnet  |
| :----------------------------  | :------   |
| Henry Gabriel Peralta Martinez | 201712289 |
| Brando Iván Muñoz Debroy       | 201700890 |
| Diego Abraham Robles Meza      | 201901429 |
| Oscar David Padilla Vásquez    | 202103250 |
| Pablo Jose Oliva Bonilla       | 201700898 |

---

## Objetivos del proyecto
El objetivo de este proyecto es proporcionar a los estudiantes una herramienta digital que les permita administrar de forma sencilla sus archivos y organizar sus tareas mediante recordatorios programados, ayudándoles a mantener un flujo de trabajo eficiente.

Además, se integran funcionalidades adicionales como la traducción de texto mediante **AWS Translate** y la lectura de texto en voz mediante **AWS Polly**, lo que amplía las posibilidades de uso en entornos educativos diversos.

Este proyecto está diseñado para ser escalable, permitiendo la incorporación de nuevas funcionalidades en el futuro con el fin de continuar apoyando el desarrollo académico de los estudiantes.

---

## Descripción del proyecto
**TASKPLANNER** es una plataforma web enfocada en la organización académica, diseñada para ayudar a los estudiantes a gestionar de manera eficiente sus actividades escolares. La aplicación ofrece un dashboard principal con un calendario interactivo y la posibilidad de crear y administrar cursos personalizados Dentro de cada curso, los estudiantes podrán almacenar archivos, crear tareas con fechas específicas, y registrar notas importantes relacionadas con el contenido del curso.

---

## Arquitectura del proyecto
La arquitectura de **TASKPLANNER** se basa en un modelo de dos capas: una capa frontend desplegada como una aplicación web estática, y una capa backend gestionada mediante servicios de AWS. Esta arquitectura permite escalabilidad, seguridad y eficiencia en el uso de recursos.

#### Capa Frontend (Web Estática)
- **Amazon S3** aloja los archivos estáticos de la interfaz web. El frontend consume APIs expuestas por el backend para funcionalidades dinámicas.

#### Capa Backend
- **Amazon EC2** aloja la aplicación backend desarrollada en Node.js, encargada de manejar la lógica del sistema.

- **Elastic Load Balancer (ELB)** distribuye el tráfico entrante entre múltiples instancias EC2 para garantizar alta disponibilidad.

- **Amazon RDS** gestiona la base de datos relacional, donde se almacenan usuarios, tareas, recordatorios, notas y relaciones entre cursos.

#### Funcionalidades Serverless
- **AWS Lambda gestiona** tareas específicas como la carga de archivos.
Amazon API Gateway expone estas funciones serverless a través de endpoints HTTP seguros.

#### Almacenamiento de Archivos
- **Amazon S3** también es utilizado para almacenar archivos personales subidos por los usuarios (PDFs, imágenes, etc.).

#### Funcionalidades Inteligentes
- **Amazon Translate** permite traducir textos a múltiples idiomas desde la plataforma.

- **Amazon Polly** genera audios en voz natural para facilitar la lectura de textos.

- **Amazon Rekognition** permite el análisis y reconocimiento de imágenes (por ejemplo, para extraer texto o validar contenido).

#### Notificaciones
- **Amazon SES (Simple Email Service)** se utiliza para el envío de notificaciones por correo electrónico a los usuarios, como recordatorios de tareas o confirmaciones.

#### Seguridad y Accesos
- **AWS IAM (Identity and Access Management)** define políticas de acceso específicas por servicio, garantizando que cada componente tenga los permisos mínimos necesarios para operar.

---

## Presupuesto mensual

| Servicio         | Tipo / Configuración Estimada                            | Costo Mensual Aproximado (USD) |
|------------------|-----------------------------------------------------------|-------------------------------:|
| **EC2**          | t3.micro (750 hrs) con Amazon Linux                      | $10.00                         |
| **ELB**          | 1 Load Balancer + tráfico estimado                       | $18.00                         |
| **RDS**          | db.t3.micro + 20GB de almacenamiento                     | $15.00                         |
| **S3**           | 10GB almacenamiento + peticiones                         | $2.00                          |
| **Lambda**       | 1M ejecuciones + 400K GB-s                               | $1.00                          |
| **API Gateway**  | 1M llamadas HTTP                                         | $3.50                          |
| **IAM**          | Roles y políticas (sin costo directo)                    | $0.00                          |
| **Translate**    | 1 millón de caracteres traducidos                        | $15.00                         |
| **Polly**        | 1 millón de caracteres sintetizados                      | $4.00                          |
| **Rekognition**  | 1,000 imágenes procesadas                                | $1.00                          |
| **SES**          | 10,000 correos enviados                                  | $1.00                          |
| **Total Aproximado** |                                                   | **$70.50 USD**                 |

---

## Servicios Utilizados

- **IAM:** Creación de roles y políticas específicas por servicio.
- **EC2:** Creación de instancia para backend en NodeJS.
- **ELB:** Balanceo de carga entre las instancias EC2.
- **S3:** Almacenamiento de archivos estáticos y archivos de usuario.
- **RDS:** Base de datos para gestión de usuarios y tareas.
- **Lambda:** Funciones serverless para cargar archivos.
- **API Gateway:** Exposición de funciones serverless vía HTTP.
- **Rekognition:** Reconocimiento de imagenes.
- **SES:** Envio de notificaciones al correo.
- **Polly:** Generación de voz con IA.
- **Translate:** Traducción de textos a otro idioma.

---

# Manual de Usuario
En este apartado se muestran imagenes del funcionamiento que tiene la aplicación con los servicios desplegados en la nube, el manual sirve como guia para el usuario para entender el funcionamiento de la aplicación.

---
## Objetivos del manual
Explicar de manera clara y concisa el funcionamiento general de la aplicación **TASKPLANNER**.

Guiar al usuario en el proceso de navegación por la plataforma, desde el acceso inicial hasta el uso completo de sus funcionalidades.

Describir el uso de herramientas adicionales como la traducción de texto mediante **AWS Translate** y la lectura en voz alta con **AWS Polly**.

---
## Descripción de la aplicación
**TASKPLANNER** es una aplicación web diseñada para apoyar a estudiantes en la gestión de su vida académica. Permite organizar cursos, tareas, archivos y notas dentro de una interfaz intuitiva con un calendario interactivo. Además, incorpora herramientas complementarias como traducción de texto mediante **AWS Translate** y lectura en voz con **AWS Polly**, ofreciendo una experiencia más accesible y completa para el aprendizaje.

---
### Register
![](/IMG/Register.png)
En este apartado el usuario es capaz de crear un nuevo usuario si es que aun no ha creado una cuenta, se le pedirán datos personales para crear su cuenta.

---
### Login
![](/IMG/Login.png)
En este apartado si el usuario no tiene un cuenta puede crear una en el apartado de registrar, si el usuario ya posee una cuenta, al ingresar sus credenciales puede acceder a las funcionalidades de la aplicación.

---
### Calendario
![](/IMG/Calendario.png)
En este apartado el usuario puede crear sus recordatorios de actividades para tal fecha, al crear una tarea al usuario se le notificará al correo que una tarea fue creada.

---
### Archivos
![](/IMG/Archivos.png)
En este apartado el usuario puede cargar archivos para almacenarlos en este apartado, puede subir pdf, imagenes y archivos de texto, una vez estos archivos esten cargados, el usuario podra visualizarlos o descargar los archivos que esten en este apartado.

---
### Traductor
![](/IMG/Traductor.png)
En este apartado el usuario podra escribir cualquier texto en español que necesite para que la aplicación se lo traduzca a otro idioma, y se generará un audio el cual contiene el texto escrito que será leido por una voz generada por IA.
