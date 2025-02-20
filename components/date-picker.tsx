"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);

  return (
    <Popover>
      <PopoverTrigger className="w-full! grow" asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dates?.length && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {dates?.length ? (
            format(dates[0], "PPP", { locale: es }) + (dates.length > 1 ? ` y ${dates.length - 1} más` : "")
          ) : (
            <span>Escoga sus fechas</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}