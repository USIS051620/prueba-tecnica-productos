# 🎨 LuxeEdit Frontend - Catálogo de Productos Premium

Esta es la interfaz de usuario de la prueba técnica, desarrollada con un enfoque en **diseño minimalista, alta performance y experiencia de usuario fluida**.

## 🚀 Tecnologías Principales

- **[Next.js 15](https://nextjs.org/):** Utilizando el potente **App Router** para navegación y renderizado eficiente.
- **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto para un código robusto y libre de errores en producción.
- **[Tailwind CSS](https://tailwindcss.com/):** Estilizado moderno y responsivo con una estética de alta gama.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Manejo de estado global ligero para una sincronización instantánea de los productos.
- **[Lucide React](https://lucide.dev/):** Set de iconos vectoriales elegantes y consistentes.
- **[Axios](https://axios-http.com/):** Cliente HTTP para comunicación fluida con la API.

---

## 🛠️ Instalación y Configuración Local

1.  **Asegúrese de tener instalado [Bun](https://bun.sh/)**.
2.  **Instale las dependencias:**
    ```bash
    bun install
    ```
3.  **Configuración de la API:**
    Configuración para conectarse al backend en `http://localhost:3001` (o la URL de producción). Puede modificar esto en el archivo `src/app/store.ts`.

4.  **Inicie el servidor de desarrollo:**
    ```bash
    bun dev
    ```
5.  **Acceda a la aplicación:**
    Abra [http://localhost:3000](http://localhost:3000) en su navegador.

---

## ✨ Características Destacadas

### 📱 Diseño Totalmente Responsivo
La interfaz ha sido diseñada con un enfoque "Mobile-First", garantizando una experiencia impecable en dispositivos móviles, tablets y monitores de escritorio de gran resolución.

### ⚡ Gestión de Estado Reactiva
Gracias a **Zustand**, las acciones de crear, editar y eliminar productos se reflejan instantáneamente en la interfaz sin necesidad de recargar la página, ofreciendo una sensación de aplicación nativa.

### 🎨 Estética Minimalista "Wow"
- **Backdrop Blur:** Menús y modales con efectos de cristal esmerilado.
- **Micro-interacciones:** Animaciones suaves al cargar y al interactuar con las tarjetas de productos.
- **UX Optimizada:** Manejo claro de estados de carga (Loading) y mensajes de error descriptivos.

---

## 📁 Estructura de Archivos

- `/app`: Rutas y componentes principales.
- `/app/page.tsx`: Vista principal de la tienda y lógica de modales.
- `/app/store.ts`: Lógica de negocio y peticiones a la API (Zustand).
- `/app/types.ts`: Definición de interfaces de TypeScript.
- `/app/globals.css`: Configuraciones de Tailwind CSS y animaciones.