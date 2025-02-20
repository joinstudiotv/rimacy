// app/api/proxy/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extraemos los parámetros de la URL del request
  const { searchParams } = new URL(request.url);
  
  // Construimos la URL externa con los parámetros recibidos
  const externalUrl = new URL("http://157.230.87.83/API/pv/buscar/");
  externalUrl.search = searchParams.toString();
  
  try {
    const response = await fetch(externalUrl.toString());
    if (!response.ok) {
      throw new Error("Error al conectar con la API externa");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
		console.error(error);
    return NextResponse.json({ error: 'Fallo en la consulta a la API externa' }, { status: 500 });
  }
}
