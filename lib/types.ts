export type PuntoDeVenta = {
  id: number
  nombre: string
  observaciones: string | null
  direccion: string
  latitud: number
  longitud: number
  puntaje: number
  puntaje_calculado: number
  estado: boolean
  color: string
  razon_social: string
  ruta: string
  telefono: string
  monto: number
  cant: number
  mapa: boolean
  total: number
  fecha: string
}

export type Status = {
	value: any
	label: string
}