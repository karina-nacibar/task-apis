// src/app.ts

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.config";
import taskRoutes from "./tasks/task.routes";
// --- ¡Nuevas importaciones! ---
import projectRoutes from "./projects/project.routes";
import personRoutes from "./people/person.routes";
// -----------------------------

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Ruta de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de tareas (Existente)
app.use("/tasks", taskRoutes);

// --- ¡Nuevas rutas integradas! ---
app.use("/projects", projectRoutes);
app.use("/people", personRoutes);
// ---------------------------------

// Ruta simple para verificar que el servidor responde
app.get("/", (req, res) => {
  res.send("Task API is running. Go to /api-docs for Swagger UI.");
});

export default app;