export class Detalleprestamovehiculo {
    constructor(
        public idDetallePrestamo:number,
        public prestamo:number,
        public observaciones:string,
        public kmInicial:string,
        public kmFinal:string,
        public vehiculoPrestado:number,
        public fechaDevolucion:Date,
    ){

    }
}
