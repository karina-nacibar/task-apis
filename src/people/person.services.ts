// src/people/person.sevices.ts

import { Person, CreatePersonDto, UpdatePersonDto } from "./person.model";

const people: Person[] = [];
let currentId = 1;

class PersonService {
  getAll(): Person[] {
    return people;
  }

  getById(id: number): Person | undefined {
    return people.find((p) => p.id === id);
  }

  create(data: CreatePersonDto): Person {
    const newPerson: Person = {
      id: currentId++,
      name: data.name,
      email: data.email,
      role: data.role || "Member", // Rol por defecto si no se proporciona
    };

    people.push(newPerson);
    return newPerson;
  }

  update(id: number, data: UpdatePersonDto): Person | null {
    const person = this.getById(id);
    if (!person) {
      return null;
    }

    if (data.name !== undefined) {
      person.name = data.name;
    }
    if (data.email !== undefined) {
      person.email = data.email;
    }
    if (data.role !== undefined) {
      person.role = data.role;
    }

    return person;
  }

  delete(id: number): boolean {
    const index = people.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    people.splice(index, 1);
    return true;
  }
}

export const personService = new PersonService();