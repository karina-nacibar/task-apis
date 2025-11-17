// src/people/person.routes.ts

import express, { Request, Response } from "express";
import { personService } from "./person.services";
import { CreatePersonDto, UpdatePersonDto } from "./person.model";

const router = express.Router();

// GET /people - listar todos
router.get("/", (req: Request, res: Response) => {
  const people = personService.getAll();
  res.json(people);
});

// GET /people/:id - obtener por id
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid person id" });
  }

  const person = personService.getById(id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  res.json(person);
});

// POST /people - crear nuevo
router.post("/", (req: Request, res: Response) => {
  const body = req.body as CreatePersonDto;

  if (!body.name || body.name.trim() === "" || !body.email || body.email.trim() === "") {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newPerson = personService.create(body);

  res.status(201).json(newPerson);
});

// PUT /people/:id - actualizar
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid person id" });
  }

  const updatedPerson = personService.update(id, req.body as UpdatePersonDto);

  if (!updatedPerson) {
    return res.status(404).json({ message: "Person not found" });
  }

  res.json(updatedPerson);
});

// DELETE /people/:id - eliminar
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid person id" });
  }

  const wasDeleted = personService.delete(id);

  if (!wasDeleted) {
    return res.status(404).json({ message: "Person not found" });
  }

  // 204 No Content para eliminación exitosa
  res.status(204).send();
});

export default router;