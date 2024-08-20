export interface Pedido {
    id_pedido?: number;
    id_receta: number;
    descripcion: string;
    fecha_pedido: Date;
    estado: string;
  }
  