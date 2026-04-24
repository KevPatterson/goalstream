# Guía de Contribución

¡Gracias por tu interés en contribuir a GoalStream! Este documento proporciona pautas y mejores prácticas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor, reporta comportamientos inaceptables.

## 🤔 ¿Cómo puedo contribuir?

### Reportar Bugs

Antes de crear un reporte de bug:
- Verifica que no exista un issue similar
- Determina en qué repositorio debería ir el issue
- Recopila información sobre el bug

Cuando crees un reporte de bug, incluye:
- **Título claro y descriptivo**
- **Pasos para reproducir** el problema
- **Comportamiento esperado** vs **comportamiento actual**
- **Capturas de pantalla** (si aplica)
- **Información del entorno** (navegador, OS, versión de Node)

### Sugerir Mejoras

Las sugerencias de mejoras son bienvenidas. Incluye:
- **Descripción clara** de la mejora
- **Casos de uso** específicos
- **Mockups o ejemplos** (si aplica)

### Tu Primera Contribución de Código

¿No sabes por dónde empezar? Busca issues etiquetados con:
- `good first issue` - issues apropiados para principiantes
- `help wanted` - issues que necesitan atención

## 🛠️ Configuración del Entorno

1. Fork el repositorio
2. Clona tu fork:
```bash
git clone https://github.com/tu-usuario/goalstream.git
cd goalstream
```

3. Añade el repositorio original como upstream:
```bash
git remote add upstream https://github.com/original-usuario/goalstream.git
```

4. Instala las dependencias:
```bash
npm install
```

5. Crea una rama para tu feature:
```bash
git checkout -b feature/mi-nueva-funcionalidad
```

## 🔄 Proceso de Desarrollo

1. **Mantén tu fork actualizado**:
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Desarrolla en una rama separada**:
```bash
git checkout -b feature/nombre-descriptivo
```

3. **Haz commits frecuentes** con mensajes descriptivos

4. **Ejecuta las pruebas** antes de hacer push:
```bash
npm run lint
npm run type-check
npm run build
```

5. **Push a tu fork**:
```bash
git push origin feature/nombre-descriptivo
```

6. **Abre un Pull Request** desde tu fork al repositorio original

## 📝 Estándares de Código

### TypeScript

- Usa TypeScript para todo el código nuevo
- Define tipos explícitos, evita `any`
- Usa interfaces para objetos complejos
- Documenta funciones complejas con JSDoc

```typescript
// ✅ Bueno
interface UserProps {
  name: string;
  age: number;
}

function greetUser(user: UserProps): string {
  return `Hola, ${user.name}`;
}

// ❌ Malo
function greetUser(user: any) {
  return `Hola, ${user.name}`;
}
```

### React

- Usa componentes funcionales con hooks
- Nombra componentes con PascalCase
- Usa `memo` para optimizar re-renders cuando sea necesario
- Mantén componentes pequeños y enfocados

```typescript
// ✅ Bueno
export default function MatchCard({ match }: MatchCardProps) {
  return <div>...</div>;
}

// ❌ Malo
export default function matchcard(props) {
  return <div>...</div>;
}
```

### Estilos

- Usa Tailwind CSS para estilos
- Sigue el sistema de diseño existente
- Usa variables CSS para colores del tema
- Mantén clases ordenadas (layout → spacing → typography → colors)

```tsx
// ✅ Bueno
<div className="flex items-center gap-2 px-4 py-2 text-sm text-primary">

// ❌ Malo
<div className="text-primary px-4 flex gap-2 py-2 items-center text-sm">
```

### Formato

El proyecto usa Prettier y ESLint. Antes de hacer commit:

```bash
npm run format
npm run lint:fix
```

## 💬 Commits

Usa mensajes de commit descriptivos siguiendo esta convención:

```
tipo(ámbito): descripción breve

Descripción más detallada si es necesario.

Fixes #123
```

### Tipos de commit:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan el código)
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos:

```
feat(watch-page): añade selector de calidad de video

Implementa un menú desplegable para seleccionar la calidad
del stream (SD, HD, FHD, 4K).

Fixes #45
```

```
fix(admin-panel): corrige error al eliminar streams

El contador de streams no se actualizaba correctamente
al eliminar un stream.

Closes #67
```

## 🔀 Pull Requests

### Antes de enviar un PR:

- [ ] El código sigue los estándares del proyecto
- [ ] Has ejecutado `npm run lint` sin errores
- [ ] Has ejecutado `npm run type-check` sin errores
- [ ] El build se genera correctamente (`npm run build`)
- [ ] Has actualizado la documentación si es necesario
- [ ] Tu rama está actualizada con `main`

### Plantilla de PR:

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se ha probado?
Describe las pruebas realizadas

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas complejas
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He verificado que no hay conflictos
```

## 🎯 Áreas de Contribución

### Prioridades actuales:

1. **Tests**: Implementar tests unitarios y de integración
2. **Accesibilidad**: Mejorar ARIA labels y navegación por teclado
3. **Rendimiento**: Optimizar carga de imágenes y componentes
4. **Documentación**: Expandir documentación de componentes
5. **Internacionalización**: Añadir soporte multi-idioma

### Ideas para contribuir:

- Mejorar el diseño responsive
- Añadir animaciones y transiciones
- Implementar modo oscuro/claro
- Crear más componentes reutilizables
- Optimizar el rendimiento del reproductor
- Añadir tests automatizados
- Mejorar la accesibilidad
- Documentar componentes con Storybook

## 📞 ¿Necesitas ayuda?

Si tienes preguntas:
- Abre un issue con la etiqueta `question`
- Revisa la documentación existente
- Contacta a los mantenedores

## 🙏 Agradecimientos

¡Gracias por contribuir a GoalStream! Tu tiempo y esfuerzo son muy apreciados.
