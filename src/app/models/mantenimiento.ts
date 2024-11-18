export class Mantenimiento{
    constructor(
        public idMantenimiento:number,
        public idVehiculo:number,
        public tipoMantenimiento:number,
        public empleadoEncargado:number,
        public fechaMantenimiento:Date,
        public duracionMantenimiento:string,
        public nombreTipoMantenimiento?:string,
        public detalleMantenimiento?:string,
        public nombreVehiculo?:string,
        public nombreEmpleado?:string,
        public idDetalleMantenimiento?:number
    ){

    }
}