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

``` 
