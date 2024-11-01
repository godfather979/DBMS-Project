import { useEffect, useState } from "react";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useNavigate } from "react-router-dom";

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover"

    const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    ]

export function SearchDoctorId({ selectedDoctorId, setSelectedDoctorId, selectedPlayerId, setSelectedPlayerId }) {

    const [tables, setTables] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(selectedDoctorId || "");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTables();
      }, []);

      useEffect(() => {
        setValue(selectedDoctorId); // Update value when selectedDoctorId changes
      }, [selectedDoctorId]);

    const fetchTables = async () => {
        try {
        const res = await fetch('http://localhost:5000/doctor_id');
        const tables = await res.json();

        console.log(tables)

        const playerData = tables.map(item => ({
            value: item.doctor_id,
            label: item.doctor_id,
        }));

          setTables(playerData);
        } catch (err) {
          console.error("Error fetching tables:", err);
        }
      };



  return (

    <div className = "w-full p-5 flex justify-center z-10">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {/* {value
            ? tables.find((table) => table.value === value)?.label
            : "Select doctor..."} */}
            {/* {selectedDoctorId
              ? tables.find((table) => table.value === String(selectedDoctorId))?.label
              : "Select doctor..."
              } */}
              {selectedDoctorId
                ? tables.find((table) => {
                  // console.log("Inside tables.find - table.value:", table.value);
                  // console.log("Inside tables.find - table.value type:", typeof table.value);
                  // console.log("Inside tables.find - doc_id:", selectedDoctorId);
                  // console.log("Inside tables.find - doc_id_type:", typeof selectedDoctorId);

                  // console.log(table.value === String(selectedDoctorId));
                  return String(table.value) === String(selectedDoctorId);
                })?.label
  : "Select doctor..."}
            
            
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white bg-opacity-100">
        <Command>
          <CommandInput placeholder="Search doctor..." />
          <CommandList>
            <CommandEmpty>No Doctor found.</CommandEmpty>
            <CommandGroup>
              {tables.map((table) => (
                <CommandItem
                  key={table.value}
                  value={table.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setSelectedDoctorId(currentValue);
                    setSelectedPlayerId(0);
                    console.log(currentValue)
                    
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === table.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {table.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  )
}
