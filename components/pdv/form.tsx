"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DatePicker } from "@/components/date-picker";
import { ComboBox } from "@/components/combobox";
import { Loader, Search } from "lucide-react";
import { PuntoDeVenta } from "@/lib/types";
import { zonas, users } from "@/lib/zonas";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface FormProps {
	onDataFetched: (data: PuntoDeVenta[]) => void;
}

function getDatesInRange(from: Date, to: Date): Date[] {
	const dates = [];
	const current = new Date(from);
	while (current <= to) {
		dates.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}
	return dates;
}

export default function Form({ onDataFetched }: FormProps) {

	const [loading, setLoading] = useState(false)
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
	const [selectedZona, setSelectedZona] = useState<string>('');
	const [selectedUser, setSelectedUser] = useState<string>('');
	const [formData, setFormData] = useState({
		name: "",
		direccion: "",
		phone: "",
		ruta: "",
		puntaje: 0,
		puntaje_2: 0,
		monto_1: 0,
		monto_2: 0
	});

	const fechasQuery =
		selectedDates.length > 0
			? selectedDates
				.map((date) => `&fechas[]=${format(date, "yyyy-MM-dd")}`)
				.join("")
			: selectedRange?.from
				? (() => {
					const datesInRange = selectedRange.to
						? getDatesInRange(selectedRange.from, selectedRange.to)
						: [selectedRange.from];
					return datesInRange
						.map((date) => `&fechas[]=${format(date, "yyyy-MM-dd")}`)
						.join("");
				})()
				: "";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
	
		// Construir los parámetros básicos usando URLSearchParams
		const params = new URLSearchParams({
			palabra: formData.name,
			direccion: formData.direccion,
			telefono: formData.phone,
			ubicacion: "true",
			ruta: formData.ruta,
			puntaje: String(formData.puntaje),
			puntaje_2: String(formData.puntaje_2),
			monto_1: String(formData.monto_1),
			monto_2: String(formData.monto_2),
		});
	
		// Agregar parámetros opcionales
		if (selectedZona) {
			params.append("zonaId", selectedZona);
		}
		if (selectedUser) {
			params.append("user", selectedUser);
		}
	
		// fechasQuery ya contiene los parámetros formateados (ej: &fechas[]=2025-02-20&fechas[]=2025-02-21)
		const url = `/api/proxy?${params.toString()}${fechasQuery}`;
	
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Error en la consulta a la API");
			}
			const results: PuntoDeVenta[] = await response.json();
			onDataFetched(results);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Nombre del Detallista</Label>
					<Input
						id="name"
						name="name"
						placeholder="Don Pepe"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="direccion">Dirección</Label>
					<Input
						id="direccion"
						name="direccion"
						placeholder="Urb. Las Caléndulas B7"
						value={formData.direccion}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="phone">Teléfono</Label>
					<Input
						id="phone"
						name="phone"
						placeholder="987 654 321"
						inputMode="tel"
						value={formData.phone}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="ruta">Ruta</Label>
					<Input
						id="ruta"
						name="ruta"
						placeholder="456"
						value={formData.ruta}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="grid sm:grid-cols-4 gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="puntaje">Min. Puntaje</Label>
					<Input
						id="puntaje"
						name="puntaje"
						placeholder="0"
						type="number"
						value={formData.puntaje}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="puntaje_2">Max. Puntaje</Label>
					<Input
						id="puntaje_2"
						name="puntaje_2"
						placeholder="9999"
						type="number"
						value={formData.puntaje_2}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="monto">Min. Monto</Label>
					<Input
						id="monto"
						name="monto"
						placeholder="0"
						type="number"
						value={formData.monto_1}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="monto_2">Max. Monto</Label>
					<Input
						id="monto_2"
						name="monto_2"
						placeholder="9999"
						type="number"
						value={formData.monto_2}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="zonas">Zonas</Label>
					<ComboBox
						placeholder="Nombre de la zona"
						statuses={zonas}
						onSelectt={(status) => {
							setSelectedZona(status?.value.toString() || '')
						}}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="usuarios">Usuarios</Label>
					<ComboBox
						placeholder="Nombre del Usuario"
						statuses={users}
						onSelectt={(status) => {
							setSelectedUser(status?.value.toString() || '')
						}}
					/>
				</div>
			</div>
			<div className="grid md:grid-cols-[1fr_1fr_auto] items-end gap-4">
				<div className="flex flex-col gap-2 flex-1">
					<Label htmlFor="range">Rango de Fechas</Label>
					<DatePickerWithRange
						onSelectRange={(range) => {
							setSelectedRange(range);
							setSelectedDates([]); // Se limpian las fechas múltiples
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 flex-1">
					<Label htmlFor="range">Rango de Fechas</Label>
					<DatePicker
						onSelectDates={(dates) => {
							setSelectedDates(dates);
							setSelectedRange(undefined); // Se limpia el rango
						}}
					/>
				</div>
				<Button className="flex-0" disabled={loading}>
					{
						loading
							? <Loader size={16} className="animate-spin" />
							: <Search size={16} />
					}
					{loading ? "Cargando" : "Buscar"}
				</Button>
			</div>
		</form>
	);
}