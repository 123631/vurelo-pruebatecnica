```
Este es un backend desarrollado con NestJS, PostgreSQL, TypeORM, JWT, WebSockets, que permite:

- Crear usuarios
- Autenticarse con JWT
- Crear portafolios de criptoactivos
- Registrar depósitos y retiros
- Consultar valor total en USD (usando CoinGecko)
- Recibir notificaciones en tiempo real con WebSocket

```

```
⚙️ Requisitos

- Node.js >= 18
- PostgreSQL >= 12
- (Opcional) Docker + Docker Compose
```

```

Instalación :


git clone https://github.com/123631/vurelo-pruebatecnica.git

cd vurelo-backend

npm install

Crear la BD en postgresql

CREATE DATABASE vurelo_db;

psql -U postgres vurelo_db;

Ejecutar lo que está en el archivo schema.sql

```

```

Crear variables de entorno

- Crear archivo .env a partir del archivo .env.example

```
```

Ejecutar 

npm run start:dev

La API estará corriendo en:
http://localhost:3000


Swagger
http://localhost:3000/api

WebSocket 

Ejecutar en la raíz del proyecto:

node ws-client.js

Saldrá:
🟢 Conectado al servidor WebSocket

Se esperará el evento transaction_created 
```

```
Los principales end point son los siguientes:
| Método | Ruta                         | Descripción                                 |
_______________________________________________________________________________________
| POST   | `/users`                     | Crear un nuevo usuario                      |
| GET    | `/users/:id`                 | Obtener info del usuario                    |
| POST   | `/auth/login`                | Iniciar sesión (token)                      |
| POST   | `/portfolios`                | Crear portafolio                            |
| GET    | `/portfolios/:userId`        | Listar portafolios de un usuario            |
| GET    | `/portfolios/:id/value`      | Valor total en USD                          |
| POST   | `/transactions`              | Registrar depósito/retiro                   |
| GET    | `/transactions/:portfolioId` | Listar transacciones del portafolio         |
---------------------------------------------------------------------------------------


Como usar JWT Token?

Regístrate con POST /users

Haz login en POST /auth/login

Guarda el token que recibes

En Postman o Swagger, usa el header:

Authorization: Bearer <tu_token_generado>


Despliegue en railway:

https://vurelo-pruebatecnica-production.up.railway.app/api