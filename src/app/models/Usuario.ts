export class Usuario{
    id?: string | null;
    nombre: string;
    apellido: string;
    telefono: string;
    comuna: string;

    constructor(nombre: string, apellido: string, telefono: string, comuna: string){
        this.nombre = nombre;
        this.apellido = apellido,
        this.telefono = telefono;
        this.comuna = comuna;
    }
}