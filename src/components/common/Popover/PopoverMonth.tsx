import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import MonthPicker from "../MonthPicker";

interface Props {
  onMontChange: (value: Date) => void;
}

export default function PopoverMonth({ onMontChange }: Props) {
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <input
        name="month"
        value={month?.toString() ?? ""}
        className="hidden"
        readOnly
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !month && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {month ? format(month, "yyyy-MM") : <span>选择月份</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthPicker
            currentMonth={month}
            onMonthChange={(value) => {
              setMonth(value);
              setOpen(false);
              onMontChange(value);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
