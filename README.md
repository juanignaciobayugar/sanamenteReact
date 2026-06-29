# React + TypeScript + Vite

Este repositorio contiene el desarrollo del **Portal Frontend** para el proyecto **"Sanamente"**, iniciado a partir de una plantilla optimizada con soporte para Hot Module Replacement (HMR) y tipado estricto.

---

# "Sanamente" - Portal Frontend (`sanamenteReactPortal`)

**Sanamente** es una plataforma web de salud digital e integral diseñada exclusivamente para el seguimiento, control y organización diaria de pacientes con patologías crónicas. El propósito principal de la aplicación es brindarles a los usuarios una interfaz limpia, intuitiva y accesible donde puedan autogestionar sus rutinas de salud sin complicaciones.

Este repositorio representa el Frontend interactivo del ecosistema, migrado de una estructura nativa a una arquitectura moderna basada en la separación de responsabilidades (**decoupling**), comunicándose de forma asíncrona y segura con el servidor Backend.

---

## 🛠️ Tecnologías y Herramientas Utilizadas (Frontend)

Para garantizar una experiencia de usuario fluida, interactiva y robusta, se implementaron las siguientes tecnologías:

* **React.js (con Vite):** Estructura basada en componentes reutilizables y un empaquetado ágil que permite una navegación fluida tipo SPA (*Single Page Application*).
* **TypeScript:** Implementación de interfaces y tipos personalizados para asegurar la integridad de los datos que viajan por los componentes.
* **React Router DOM:** Manejo de rutas internas y protección de rutas privadas para navegar instantáneamente y sin recargas de página.
* **SweetAlert2:** Integración de ventanas modales estéticas y personalizadas para interactuar con el usuario (confirmaciones, ingresos de tareas y alertas).
* **CSS3 Personalizado:** Estilos orientados a la experiencia de usuario (UX) utilizando la tipografía *Poppins*, optimizados con variables CSS para el manejo ágil de colores y espaciados.

---

## 📁 Estructura del Proyecto

Este repositorio corresponde exclusivamente al **Portal Frontend (`sanamenteReactPortal`)**:

```text
sanamenteReactPortal/
├── src/
│   ├── components/     # Componentes reutilizables (CardCalendario, MainCalendario, etc.)
│   ├── pages/          # Vistas principales (Login, Registro, Dashboard/Calendario)
│   ├── routes/         # Configuración de rutas públicas y protegidas
│   ├── services/       # Conexión con la API del Backend (Fetch/Axios hacia NestJS)
│   ├── styles/         # Archivos CSS personalizados y globales (Variables, Poppins)
│   ├── App.tsx         # Componente principal de React
│   └── main.tsx        # Punto de entrada de Vite
├── package.json        # Dependencias de React y scripts de desarrollo
└── tsconfig.json       # Configuración de TypeScript en el Frontend
