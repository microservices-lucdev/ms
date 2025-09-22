# Microservicios con Nestjs

## Descripción
`ms` es un repositorio de prueba de arquitectura de **microservicios** construida con **NestJS + TypeScript**. Contiene al menos dos piezas principales:

- `client-gateway` — API Gateway (HTTP) que orquesta y expone los servicios.
- `products-ms` — Microservicio responsable del dominio de **productos** (CRUD, validación, persistencia).

El objetivo es servir como referencia educativa para comunicación entre servicios (TCP), DTOs, validación, documentación (Swagger) y despliegue con Docker.

---

## Índice
- [Requisitos](#requisitos)  
- [Instalación](#instalación-y-ejecución-desarrollo)  
- [Variables de entorno (ejemplos)](#variables-de-entorno-ejemplos)
- [Ejecucción (desarrollo)](#ejecuccion)


---

## Requisitos
- Node.js >= 18  
- npm / pnpm / yarn  
- Git
- SQL LITE

---

## Instalación (desarrollo)

Products (products-ms)
- `cd products-ms`
- `pnpm install`

Client gateway (client-gateway)
- `cd client-gateway`
- `pnpm install`

## Varibles de entorno (desarrollo)
Products (products-ms)
- `PORT=3000`
- `DATABASE_URL="URL_DB"`

Client gateway (client-gateway)
- `PORT=3001` (diferente puerto que los microservicios)
- `DATABASE_URL="file:./dev.db"` (puedes dejar solo un string, no es necesario dentro de client-gateway)
- `PRODUCTS_MS_HOST=localhost` (host de UN microservicio, en este caso de PRODUCTS)
- `PRODUCTS_MS_PORT=3000` (*DEBE SER EL MISMO QUE DE DECLARO EN EL .ENV DE PRODUCTS O DEL MICROSERVICIO*)

## Ejecucción (desarrollo)
Products (products-ms)
(terminal 1)
- `cd products-ms`
- `pnpm start:dev`

Client gateway (client-gateway)
(terminal 2)
- `cd client-gateway`
- `pnpm start:dev`
