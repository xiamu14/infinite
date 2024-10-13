import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export default function PopoverDate() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  return (
    <>
      <input name="date" value={date?.toString() ?? ""} className="hidden" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd") : <span>选择日期</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(value) => {
              setDate(value);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
