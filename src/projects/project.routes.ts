// src/projects/project.routes.ts

import express, { Request, Response } from "express";
import { projectService } from "./project.services";
import { CreateProjectDto, UpdateProjectDto } from "./project.model";

const router = express.Router();

// GET /projects - listar todos
router.get("/", (req: Request, res: Response) => {
  const projects = projectService.getAll();
  res.json(projects);
});

// GET /projects/:id - obtener por id
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project id" });
  }

  const project = projectService.getById(id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

// POST /projects - crear nuevo
router.post("/", (req: Request, res: Response) => {
  const body = req.body as CreateProjectDto;

  if (!body.name || body.name.trim() === "") {
    return res.status(400).json({ message: "Project name is required" });
  }

  const newProject = projectService.create({
    name: body.name.trim(),
    description: body.description,
  });

  res.status(201).json(newProject);
});

// PUT /projects/:id - actualizar
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project id" });
  }

  const body = req.body as UpdateProjectDto;

  if (body.status && !projectService.isValidStatus(body.status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values: active, completed, on-hold",
    });
  }

  const updatedProject = projectService.update(id, body);

  if (!updatedProject) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(updatedProject);
});

// DELETE /projects/:id - eliminar
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project id" });
  }

  const wasDeleted = projectService.delete(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: "Project not found" });
  }

  // 204 No Content para eliminación exitosa
  res.status(204).send();
});

export default router;