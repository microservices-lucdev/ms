# Microservicios con Nestjs

## Descripción
`ms` es un repositorio de prueba de arquitectura de **microservicios** construida con **NestJS + TypeScript**. Contiene al menos dos piezas principales:

- `client-gateway` — API Gateway (HTTP) que orquesta y expone los servicios.
- `products-ms` — Microservicio responsable del dominio de **productos** (CRUD, validación, persistencia).

El objetivo es servir como referencia educativa para comunicación entre servicios (TCP), DTOs, validación, documentación (Swagger) y despliegue con Docker.

---

## Índice
- [Requisitos](#requisitos)  
- [Instalación y ejecución (desarrollo)](#instalación-y-ejecución-desarrollo)  
- [Variables de entorno (ejemplos)](#variables-de-entorno-ejemplos)  
- [Ejecutar con Docker / docker-compose](#ejecutar-con-docker--docker-compose)  
- [Documentación (Swagger)](#documentación-swagger)  
- [Testing](#testing)  
- [Buenas prácticas y recomendaciones](#buenas-prácticas-y-recomendaciones)  
- [Contribuciones](#contribuciones)  
- [Licencia](#licencia)

---

## Requisitos
- Node.js >= 18  
- npm / pnpm / yarn  
- Git
- SQL LITE

---

## Instalación y ejecución (desarrollo)
