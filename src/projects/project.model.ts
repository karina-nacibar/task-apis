// src/projects/project.model.ts

export type ProjectStatus = "active" | "completed" | "on-hold";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  // status no se incluye aquí, se asume 'active' por defecto
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}