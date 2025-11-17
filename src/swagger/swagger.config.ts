// src/swagger/swagger.config.ts

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Task API",
    version: "1.0.0",
    description:
      "Simple API para gestionar tareas (todo, doing, done) usando Node, Express y TypeScript",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Listar todas las tareas",
        responses: {
          200: {
            description: "Lista de tareas",
          },
        },
      },
      post: {
        summary: "Crear una nueva tarea (por defecto en estado todo)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Learn TypeScript" },
                  description: {
                    type: "string",
                    example: "Read docs and practice",
                  },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Tarea creada",
          },
          400: {
            description: "Datos inválidos",
          },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        summary: "Obtener una tarea por id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Tarea encontrada" },
          400: { description: "Id inválido" },
          404: { description: "Tarea no encontrada" },
        },
      },
      put: {
        summary: "Actualizar una tarea existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "New title" },
                  description: { type: "string", example: "New description" },
                  status: {
                    type: "string",
                    enum: ["todo", "doing", "done"],
                    example: "doing",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Tarea actualizada" },
          400: { description: "Datos inválidos" },
          404: { description: "Tarea no encontrada" },
        },
      },
      delete: {
        summary: "Eliminar una tarea",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Tarea eliminada" },
          400: { description: "Id inválido" },
          404: { description: "Tarea no encontrada" },
        },
      },
    },
    
    "/projects": {
      get: {
        tags: ["Projects"],
        summary: "Obtener todos los proyectos",
        responses: {
          200: {
            description: "Lista completa de proyectos.",
          },
        },
      },
      post: {
        tags: ["Projects"],
        summary: "Crear un nuevo proyecto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Sistema de Inventario" },
                  description: {
                    type: "string",
                    example: "Gestión de productos e inventario",
                  },
                  status: {
                    type: "string",
                    enum: ["active", "completed", "on-hold"],
                    example: "active",
                    default: "active",
                  },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Proyecto creado exitosamente.",
          },
          400: {
            description: "Bad Request (Nombre requerido)",
          },
        },
      },
    },
    "/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Obtener un proyecto específico por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID del proyecto",
          },
        ],
        responses: {
          200: { description: "Proyecto encontrado" },
          404: { description: "Proyecto no encontrado" },
        },
      },
      put: {
        tags: ["Projects"],
        summary: "Actualizar un proyecto existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID del proyecto",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Sistema Educativo v2" },
                  description: { type: "string", example: "Sistema mejorado" },
                  status: {
                    type: "string",
                    enum: ["active", "completed", "on-hold"],
                    example: "completed",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Proyecto actualizado" },
          404: { description: "Proyecto no encontrado" },
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Eliminar un proyecto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID del proyecto",
          },
        ],
        responses: {
          204: { description: "Eliminación exitosa (No Content)" },
          404: { description: "Proyecto no encontrado" },
        },
      },
    },
    // --- FIN RUTAS DE PROYECTOS ---

    // --- RUTAS DE PERSONAS (Añadido) ---
    "/people": {
      get: {
        tags: ["People"],
        summary: "Obtener todas las personas",
        responses: {
          200: {
            description: "Lista completa de personas.",
          },
        },
      },
      post: {
        tags: ["People"],
        summary: "Crear una nueva persona",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "María García" },
                  email: { type: "string", example: "maria@example.com" },
                  role: {
                    type: "string",
                    example: "Project Manager",
                    default: "Member",
                  },
                },
                required: ["name", "email"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Persona creada exitosamente.",
          },
          400: {
            description: "Bad Request (Nombre y email son requeridos)",
          },
        },
      },
    },
    "/people/{id}": {
      get: {
        tags: ["People"],
        summary: "Obtener una persona específica por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID de la persona",
          },
        ],
        responses: {
          200: { description: "Persona encontrada" },
          404: { description: "Persona no encontrada" },
        },
      },
      put: {
        tags: ["People"],
        summary: "Actualizar una persona existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID de la persona",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Juan Rodríguez Silva" },
                  email: { type: "string", example: "juan@example.com" },
                  role: {
                    type: "string",
                    example: "Senior Developer",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Persona actualizada" },
          404: { description: "Persona no encontrada" },
        },
      },
      delete: {
        tags: ["People"],
        summary: "Eliminar una persona",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID de la persona",
          },
        ],
        responses: {
          204: { description: "Eliminación exitosa (No Content)" },
          404: { description: "Persona no encontrada" },
        },
      },
    },
    // --- FIN RUTAS DE PERSONAS ---
  },
};

export default swaggerDocument;