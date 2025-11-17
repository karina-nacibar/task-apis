// src/people/person.model.ts

export interface Person {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface CreatePersonDto {
  name: string;
  email: string;
  role?: string;
}

export interface UpdatePersonDto {
  name?: string;
  email?: string;
  role?: string;
}