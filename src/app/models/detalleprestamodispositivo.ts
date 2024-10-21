export class Detalleprestamodispositivo {
    constructor(
        public idDetalleDispositivo:number,
        public observaciones:string,
        public prestamo:number,
        public dispositivoPrestado:number,
        public fechaDevolucion:Date,
    ){

    }
}
