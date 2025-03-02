# Sistema de Registro de Visitas para Iglesia

Este es un sistema CRUD (Create, Read, Update, Delete) para registrar y gestionar las visitas de una iglesia. El sistema está diseñado para ser fácil de usar y proporciona una interfaz moderna y amigable.

## Características

- Registro de nuevas visitas con nombre, apellido, referido y fecha
- Visualización de todas las visitas en una tabla ordenada
- Actualización de información de visitas existentes
- Eliminación de registros de visitas
- Búsqueda de visitas por nombre, apellido o referido
- Estadísticas en tiempo real (total de visitas, visitas del mes, referido más común)
- Diseño responsive que se adapta a diferentes dispositivos
- Almacenamiento local de datos (localStorage)

## Estructura del Proyecto

```
proyecto-registro-iglesia/
├── index.html       # Archivo HTML principal
├── css/
│   └── styles.css   # Estilos CSS
├── js/
│   └── app.js       # Lógica JavaScript
└── README.md        # Documentación
```

## Uso

1. Clona o descarga este repositorio
2. Abre el archivo `index.html` en tu navegador
3. Comienza a registrar visitas

## Funcionalidades Principales

### Registro de Visitas
- Completa el formulario con la información de la visita
- Haz clic en "Guardar" para registrar la visita

### Búsqueda de Visitas
- Escribe en el campo de búsqueda para encontrar visitas específicas
- Se pueden buscar por nombre, apellido o referido

### Edición de Visitas
- Haz clic en el botón "Editar" junto a la visita que deseas modificar
- Actualiza la información y haz clic en "Guardar"

### Eliminación de Visitas
- Haz clic en el botón "Eliminar" junto a la visita que deseas borrar
- Confirma la eliminación en la ventana modal que aparece

## Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- No requiere conexión a internet una vez cargada la página

## Notas Importantes

- Los datos se almacenan en el localStorage del navegador
- Los datos no se sincronizan entre diferentes dispositivos
- Se recomienda hacer copias de seguridad periódicas de los datos

## Personalización

El sistema puede ser personalizado modificando los archivos CSS y JavaScript según sea necesario.
