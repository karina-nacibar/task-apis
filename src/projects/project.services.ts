// src/projects/project.sevices.ts

import { Project, ProjectStatus, CreateProjectDto, UpdateProjectDto } from "./project.model";

const projects: Project[] = [];
let currentId = 1;

class ProjectService {
  getAll(): Project[] {
    return projects;
  }

  getById(id: number): Project | undefined {
    return projects.find((p) => p.id === id);
  }

  isValidStatus(status: string): status is ProjectStatus {
    return ["active", "completed", "on-hold"].includes(status);
  }

  create(data: CreateProjectDto): Project {
    const newProject: Project = {
      id: currentId++,
      name: data.name,
      description: data.description,
      status: "active", // Por defecto
    };

    projects.push(newProject);
    return newProject;
  }

  update(id: number, data: UpdateProjectDto): Project | null {
    const project = this.getById(id);
    if (!project) {
      return null;
    }

    if (data.name !== undefined) {
      project.name = data.name;
    }
    if (data.description !== undefined) {
      project.description = data.description;
    }
    if (data.status !== undefined) {
      project.status = data.status;
    }

    return project;
  }

  delete(id: number): boolean {
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    projects.splice(index, 1);
    return true;
  }
}

export const projectService = new ProjectService();