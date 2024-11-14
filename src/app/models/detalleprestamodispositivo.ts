export class Detalleprestamodispositivo {
    constructor(
        public idDetallePrestamoDispositivo:number,
        public observaciones:string,
        public prestamo:number,
        public dispositivosPrestado:number,
        public fechaDevolucion:Date,
    ){

    }
}
