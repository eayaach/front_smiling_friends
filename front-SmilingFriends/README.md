## Entrega 3

Los alcances de esta entrega responden a todos los acordados en la reunión: está la landing page, la navbar que es una
sidebar totalmente funcional (que presenta el login, las instrucciones, la página de Nosotros y el leaderboard). 

También está la implementación de la base de datos, y la conexión de backend y frontend, mediante websockets se implementó el registro e inicio
de sesión de usuarios, así como la funcionalidad de editar perfil, incluyendo su correo, nombre de usuario y clave.

Además, puede crear partidas, las que se reflejan en el sitio de "join" de home. La vista de partidas se
encuentra conectada a nivel de web sockets, de modo que se actualiza en tiempo real. Sin embargo, la funcionalidad de unirse
efectivamente a la partida, no está implementada a nivel de frontend, pero sí a nivel de backend. Esto se decidió debido
a que responde a la jugabilidad, lo que es parte de los alcances de la próxima entrega.

Para una revisión detallada, se debe crear un .env con las siguientes variables:

VITE_BACKEND_URL = "http://localhost:8080"

VITE_BACKEND_SOCKET = "ws://localhost:8080"

En el backend, hay que actualizar el .env respectivo

DB_USERNAME = """"""""
DB_PASSWORD = """"""""
DB_NAME = """""""""


JWT_SECRET= """""""

El último parámetro es importante para la autenticación de usuarios.