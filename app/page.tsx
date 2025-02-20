"use client";

import { useState } from "react";
import Form from "@/components/pdv/form";
import PDVTable from "@/components/pdv/table";
import { PuntoDeVenta } from "@/lib/types";

export default function Home() {

  const [data, setData] = useState<PuntoDeVenta[]>([]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="font-bold text-3xl">Puntos de Venta</h1>
        <p className="text-gray-500">Aquí se encuentran los detallistas</p>
      </div>
      <Form onDataFetched={setData} />
      <PDVTable data={data} />
    </div>
  );
}
