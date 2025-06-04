export class Rol {
  id!: number;
  nombre!: string;
  descripcion!: string;
}

export class Usuario {
  id!: number;
  username!: string;
  correo!: string;
  rol!: Rol;
}

export class Persona {
  id!: number;
  ci!: string;
  nombres!: string;
  apellidos!: string;
  genero!: string;
  fecha_nacimiento!: string;
  direccion!: string | null;
  telefono!: string;
  usuario!: Usuario;
}

export class Docente {
  id!: number;
  profesion!: string;
  fecha_contratacion!: string;
  persona!: Persona;
}

export class Estudiante {
  id!: number;
  rude!: string;
  persona!: Persona;
}

export class Padre {
  id!: number;
  persona!: Persona;
}
