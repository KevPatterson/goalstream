# ⚽ GoalStream

> **⚠️ PROYECTO EN DESARROLLO**: Esta aplicación está actualmente en fase de desarrollo activo. Puede contener errores, funcionalidades incompletas o comportamientos inesperados. Úsalo bajo tu propio riesgo.

Plataforma de streaming de fútbol en vivo con interfaz estilo terminal retro. GoalStream ofrece una experiencia única para ver partidos de fútbol con un diseño inspirado en terminales de comando con estética verde neón.

## ✨ Características

- 🎥 **Streaming en vivo**: Reproductor HLS con soporte multi-calidad (SD, HD, FHD, 4K)
- 🎮 **Panel de administración**: Gestión completa de partidos y streams
- 🖥️ **Interfaz terminal**: Diseño retro con tema verde neón y efectos de escaneo
- 📱 **Responsive**: Optimizado para dispositivos móviles y tablets
- 🌍 **Multi-idioma**: Soporte para streams en diferentes idiomas
- ⚡ **Rendimiento**: Carga rápida con Next.js 15 y React 19
- 🎨 **Personalizable**: Sistema de diseño basado en Tailwind CSS

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/KevPatterson/goalstream.git
cd goalstream
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (opcional):
```bash
cp .env .env.local
# Edita .env.local con tus configuraciones
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador en [http://localhost:4028](http://localhost:4028)

## 📁 Estructura del Proyecto

```
goalstream/
├── public/                 # Archivos estáticos
│   ├── assets/
│   │   └── images/        # Imágenes y recursos
│   └── favicon.ico
├── src/
│   ├── app/               # App Router de Next.js
│   │   ├── homepage/      # Página principal con grid de partidos
│   │   │   └── components/
│   │   ├── watch-page/    # Reproductor de video
│   │   │   ├── components/
│   │   │   └── data/
│   │   ├── admin-panel/   # Panel de administración
│   │   │   └── components/
│   │   ├── layout.tsx     # Layout principal
│   │   └── not-found.tsx  # Página 404
│   ├── components/        # Componentes reutilizables
│   │   ├── common/        # Header, navegación, menú móvil
│   │   └── ui/            # Componentes UI (Icon, Image, Logo)
│   └── styles/            # Estilos globales y Tailwind
├── .env                   # Variables de entorno (template)
├── next.config.mjs        # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 4028
npm run build        # Genera build de producción
npm run start        # Inicia servidor de producción
npm run serve        # Alias para start

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos de TypeScript
```

## 🎨 Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 3.4** - Framework de utilidades CSS
- **HLS.js** - Reproductor de video HLS

### UI/UX
- **Heroicons** - Iconos SVG
- **Fuentes personalizadas**:
  - Bebas Neue (headings)
  - IBM Plex Sans (body)
  - IBM Plex Mono (monospace)

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **TypeScript** - Verificación de tipos

## 🎯 Funcionalidades Principales

### Página Principal (Homepage)
- Grid de partidos en vivo, próximos y finalizados
- Filtros por estado del partido
- Contador de partidos en vivo
- Tarjetas de partido con información detallada
- Partido destacado con hero banner

### Reproductor (Watch Page)
- Reproductor de video HLS con controles personalizados
- Selector de calidad de video (Auto, SD, HD, FHD, 4K)
- Selector de streams por idioma
- Entrada manual de URL de stream
- Detalles del partido en tiempo real
- Sidebar con otros partidos disponibles
- Soporte para Picture-in-Picture
- Controles de volumen y pantalla completa

### Panel de Administración
- Gestión de partidos (crear, editar, eliminar)
- Gestión de streams (crear, editar, eliminar)
- Actualización de marcadores en tiempo real
- Control de estado de partidos (en vivo, próximo, finalizado)
- Interfaz con pestañas para partidos y streams

## 🎨 Tema y Diseño

GoalStream utiliza un tema inspirado en terminales retro con los siguientes colores principales:

- **Primary**: `#00ff7f` (verde eléctrico)
- **Secondary**: `#00c45f` (verde atenuado)
- **Accent**: `#ffb700` (ámbar)
- **Background**: `#080c0a` (negro bosque profundo)
- **Surface**: `#0d1410` (superficie elevada)

El diseño incluye efectos especiales como:
- Animaciones de pulso para indicadores en vivo
- Efecto de líneas de escaneo
- Sombras de brillo (glow) en elementos activos
- Scrollbar personalizado

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Guías de Contribución

- Sigue las convenciones de código existentes
- Escribe código TypeScript tipado
- Usa Prettier para formatear el código
- Asegúrate de que ESLint no muestre errores
- Escribe commits descriptivos en español
- Documenta nuevas funcionalidades

### Reportar Problemas

Si encuentras un bug o tienes una sugerencia:

1. Verifica que no exista un issue similar
2. Abre un nuevo issue con una descripción detallada
3. Incluye pasos para reproducir el problema (si aplica)
4. Añade capturas de pantalla si es relevante

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - Desarrollo inicial

## 🙏 Agradecimientos

- Comunidad de Next.js por la excelente documentación
- Heroicons por los iconos SVG
- Mux por los streams de prueba
- Comunidad open source

## 📞 Contacto

- GitHub: [@KevPatterson](https://github.com/KevPatterson)
- Email: clavisoft@gmail.com

---

**Nota**: Este proyecto es solo para fines educativos y de demostración. Asegúrate de tener los derechos necesarios para transmitir contenido deportivo en tu jurisdicción.