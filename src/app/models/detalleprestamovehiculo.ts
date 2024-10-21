export class Detalleprestamovehiculo {
    constructor(
        public idDetallePrestamo:number,
        public prestamo:number,
        public observaciones:string,
        public kmInicla:string,
        public kmFinal:string,
        public vehiculoPrestado:Date,
        public fechaDevolucion:Date,
    ){

    }
}
