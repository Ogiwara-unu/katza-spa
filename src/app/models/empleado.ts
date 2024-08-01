export class Empleado{
    constructor(
        public idEmpleado:number,
        public nombre:string,
        public apellidos:string,
        public correo:string,
        public telefono:number,
        public departamento:number,
        public fechaContratacion:Date,
        public nombre_departamento?:string
    ){
        
    }
}