"use client"

import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Check } from "lucide-react"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Status } from "@/lib/types"

interface ComboboxProps {
	placeholder: string;
	statuses: Status[];
	onSelectt: (status: Status | null) => void;
}

export function ComboBox({
	placeholder,
	statuses,
	onSelectt
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false)
	const isMobile = useIsMobile()
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		null
	)

	if (!isMobile) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{selectedStatus ? <>{selectedStatus.label}</> : <>{placeholder}</>}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<StatusList selectedStatus={selectedStatus} placeholder={placeholder} statuses={statuses} setOpen={setOpen} setSelectedStatus={setSelectedStatus} onSelectt={onSelectt} />
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-full! justify-start">
					{selectedStatus ? <>{selectedStatus.label}</> : <>{placeholder}</>}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<StatusList selectedStatus={selectedStatus} placeholder={placeholder} statuses={statuses} setOpen={setOpen} setSelectedStatus={setSelectedStatus} onSelectt={onSelectt} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}

function StatusList({
	statuses,
	placeholder,
	setOpen,
	selectedStatus,
	setSelectedStatus,
	onSelectt
}: {
	statuses: Status[]
	placeholder: string
	setOpen: (open: boolean) => void
	selectedStatus: Status | null,
	setSelectedStatus: (status: Status | null) => void
	onSelectt: (status: Status | null) => void
}) {
	return (
		<Command>
			<CommandInput placeholder={placeholder} />
			<CommandList>
				<CommandEmpty>Sin Resultados</CommandEmpty>
				<CommandGroup>
					{statuses.map((status) => (
						<CommandItem
							key={status.value}
							value={status.value.toString()}
							onSelect={() => {
								setSelectedStatus(
									status
								)
								setOpen(false)
								onSelectt?.(status);
							}}
						>
							{status.label}
							<Check
								className={cn(
									"ml-auto",
									status.value === selectedStatus?.value ? "opacity-100" : "opacity-0"
								)}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
