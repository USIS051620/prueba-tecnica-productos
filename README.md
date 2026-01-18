# 🛠️ Guía Técnica de Configuración y Despliegue

Este documento detalla todos los comandos y pasos técnicos realizados para configurar el entorno de desarrollo y poner en producción la aplicación Fullstack.

---

## 🏗️ 1. Configuración del Backend (API & Database)

El backend actúa como el motor de la aplicación, gestionando la base de datos PostgreSQL en la nube.

### Paso a paso ejecutado:

1.  **Navegación y Preparación:**
    ```bash
    cd backend
    ```

2.  **Instalación de Dependencias:**
    Se utilizó **Bun** como gestor de paquetes por su alta velocidad:
    ```bash
    bun install
    ```

3.  **Configuración de Variables de Entorno:**
    Se creó un archivo `.env` para conectar el ORM (Drizzle) con la base de datos de Neon:
    ```env
    DATABASE_URL=postgresql://neondb_owner:***@endpoint.neon.tech/neondb
    ```

4.  **Sincronización de la Base de Datos:**
    Se ejecutó el comando para leer el archivo `schema.ts` y crear las tablas físicas en Neon:
    ```bash
    bun run db:push
    ```

5.  **Poblamiento de Datos (Seeding):**
    Para no iniciar con una tienda vacía, se insertaron 10 productos tecnológicos de prueba:
    ```bash
    bun run db:seed
    ```

6.  **Inicio del Servidor de Desarrollo:**
    El servidor quedó escuchando en el puerto 3001:
    ```bash
    bun run dev
    ```

---

## 💻 2. Desarrollo del Frontend (App Next.js)

El frontend fue construido desde cero buscando un diseño minimalista, responsivo y de alto rendimiento.

### Paso a paso ejecutado:

1.  **Inicialización del Proyecto:**
    Se utilizó el instalador oficial de Next.js con configuración recomendada (TypeScript, ESLint, Tailwind CSS y App Router):
    ```bash
    cd frontend
    bun create next-app@latest .
    ```

2.  **Instalación de Librerías Adicionales:**
    Se instalaron las herramientas para el estado global, iconos y peticiones HTTP:
    ```bash
    bun add zustand lucide-react axios
    ```

3.  **Arquitectura de Archivos:**
    Se crearon manualmente los archivos clave para la lógica de negocio dentro de `/app`:
    - `types.ts`: Definición de interfaces para robustez del código.
    - `store.ts`: Implementación de **Zustand** para gestionar el CRUD sin recargas de página.

4.  **Optimización Visual:**
    - Se limpió `globals.css` para configurar la nueva sintaxis de **Tailwind CSS v4**.
    - Se programó `page.tsx` con una arquitectura de componentes reactivos y efectos de cristal (*Backdrop blur*).

5.  **Ejecución en Desarrollo:**
    La aplicación corre localmente en el puerto 3000:
    ```bash
    bun dev
    ```

---

## 🚀 3. Flujo de Git y Deployment

Para cumplir con el requerimiento de entrega y despliegue profesional:

1.  **Control de Versiones (Git):**
    ```bash
    git init
    git add .
    git commit -m "Iniciailizacion del proyecto"
    git branch -M main
    git remote add origin https://github.com/USIS051620/prueba-tecnica-productos.git
    git push -u origin main
    ```

2.  **Despliegue del Backend (Cloudflare Workers):**
    ```bash
    cd backend
    bunx wrangler login
    bunx wrangler secret put DATABASE_URL
    Luego ponemos el enlace de la base de datos: postgresql://
    bunx wrangle deploy
    ```

3.  **Despliegue del Frontend (Vercel):**
    - Se conectó el repositorio de GitHub a la plataforma Vercel.
    - Se configuró el *Root Directory* como `/frontend`.
    - Se desplegó automáticamente mediante la integración de Vercel.

---

## Despliegue:
- Front End: https://prueba-tecnica-productos.vercel.app/ 
- Back End: https://productos-api-marvin.marvinjosuesolorzano178.workers.dev/api/products 

## 📊 Resumen de la Solución
- **Stack:** Bun, Hono, Drizzle, Neon, Next.js 15, Tailwind CSS, Zustand.
- **Funcionalidad:** CRUD Completo + Buscador + Diseño Responsivo.
- **Puntaje:** Cumple con todos los requisitos obligatorios y el 100% de los puntos extra de funcionalidad y despliegue.
