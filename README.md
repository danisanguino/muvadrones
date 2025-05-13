# 3D Rendering Intranet

This project is an intranet built with **Next.js** and **TypeScript**, designed to manage and view 3D rendering projects. It provides a secure environment where clients and administrators interact within a company-based structure.

## ✨ Features

- **Authentication and database management with [Supabase](https://supabase.com/).**
- Role-based access:
  - **Clients**: access a dashboard to view their 3D rendering projects associated with their company.
  - **Administrators**: access an admin panel to create companies, manage projects, and assign clients.
- Interactive 3D model viewing for `.obj` files using **Three.js**.
- Multi-company structure: each client belongs to a company; each company manages its own projects.
- Modern UI styled with **SASS**.

## 🛠️ Technologies

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [SASS](https://sass-lang.com/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🔐 Authentication & Access

Authentication and database are handled by Supabase.

- User roles are determined by their email address:
  - Emails registered as **clients** are directed to the client dashboard.
  - Emails registered as **admins** are directed to the admin panel.
- Supabase handles authentication (email/password).

## 🧱 User & Entity Structure

- **Company**:
  - Holds multiple projects.
  - Linked to one or more clients.

- **Client**:
  - Belongs to a company.
  - Can view their own projects and 3D render files.

- **Administrator**:
  - Can create companies.
  - Can create and manage projects under companies.
  - Can assign clients to companies.

## 📦 Common Scripts

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

-----------------------------

# Intranet de Renderizado 3D

Este proyecto es una intranet construida con **Next.js** y **TypeScript**, orientada a la gestión y visualización de proyectos de renderizado 3D. Permite a clientes y administradores interactuar dentro de un sistema seguro, organizado por empresas.

## ✨ Características

- Autenticación y base de datos gestionadas con **Supabase**.
- Acceso diferenciado según el tipo de usuario:
  - **Clientes**: acceden a su área para ver los proyectos de renderizado 3D asociados a su empresa.
  - **Administradores**: acceden al panel de administración para crear empresas, proyectos y asignar clientes.
- Visualización de archivos `.obj` en 3D con **Three.js**.
- Arquitectura multiempresa: cada cliente pertenece a una empresa, y cada empresa tiene sus propios proyectos.
- Estilizado moderno con **SASS**.

## 🛠️ Tecnologías

- **Framework**: [Next.js](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [SASS](https://sass-lang.com/)
- **Renderizado 3D**: [Three.js](https://threejs.org/)
- **Backend / BBDD / Auth**: [Supabase](https://supabase.com/)
- **Gestor de paquetes**: [pnpm](https://pnpm.io/)

## 🔐 Autenticación y Acceso

El sistema de autenticación y la base de datos están gestionados por Supabase.

- El sistema detecta el tipo de usuario basado en su correo electrónico:
  - Correos registrados como **clientes** acceden al área de cliente.
  - Correos registrados como **administradores** acceden al panel de administración.
- Se utiliza el sistema de autenticación de Supabase (email/password).

## 🧱 Estructura de Usuarios y Entidades

- **Empresa**:
  - Contiene proyectos.
  - Está asociada a uno o varios clientes.

- **Cliente**:
  - Asociado a una empresa.
  - Puede visualizar sus proyectos y modelos 3D.

- **Administrador**:
  - Puede crear empresas.
  - Puede crear proyectos asociados a empresas.
  - Puede asociar clientes a empresas existentes.

## 📦 Scripts Comunes

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Ejecutar lint
pnpm lint
