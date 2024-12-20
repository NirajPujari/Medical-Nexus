"use client";

import React, { FC, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ComboboxOption,
  ComboboxProps,
  ComboboxWrapperProps,
} from "@/types/ui";

export const ComboboxWrapper: FC<ComboboxWrapperProps> = ({
  options,
  placeholder,
}) => {
  const handleSelect = (selected: ComboboxOption | null) => {
    console.log("Selected option:", selected);
  };

  return (
    <Combobox
      options={options}
      placeholder={placeholder}
      onSelect={handleSelect}
    />
  );
};

const Combobox: FC<ComboboxProps> = ({
  options,
  placeholder = "Select an option...",
  buttonClassName = "",
  contentClassName = "",
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    null,
  );

  const handleSelect = (value: string) => {
    const option = options.find((opt) => opt.value === value) || null;
    setSelectedOption(option);
    onSelect?.(option);
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={
              "w-[150px] justify-start rounded-md border bg-white p-2 shadow-sm" +
              buttonClassName
            }
          >
            {selectedOption ? selectedOption.label : `+ ${placeholder}`}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={
            "rounded-md border bg-white p-0 shadow-md" + contentClassName
          }
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => handleSelect(value)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
