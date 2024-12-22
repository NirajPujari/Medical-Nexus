"use client";

import React, { FC, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
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
  style,
}) => {
  const [selected, setSelected] = useState<ComboboxOption | null>(null);
  const handleSelect = (selected: ComboboxOption | null) => {
    setSelected(selected);
  };
  const handleSubmit = () => {
    console.log(selected);
  };

  return (
    <>
      <Combobox
        options={options}
        placeholder={placeholder}
        onSelect={handleSelect}
        style={{ button: style?.button, content: style?.button }}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="rounded-lg bg-primary px-6 py-2 font-semibold text-highlight2 shadow-md transition-all duration-300 hover:bg-secondary hover:text-primary focus:outline-none"
      >
        Search
      </button>
    </>
  );
};

const Combobox: FC<ComboboxProps> = ({
  options,
  placeholder = "Select an option...",
  style = {
    button: "",
    command: "",
    commandItem: "",
  },
  onSelect,
}) => {
  const [open, setOpen] = useState(true);
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
    <Popover open={open}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={"rounded-md border p-2 shadow-sm " + style.button}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={"w-full rounded-md border p-0 shadow-md" + style.content}
        side="bottom"
        align="start"
      >
        <Command className="bg-primary">
          <CommandList className="h-36 w-[30rem] max-w-[30rem]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="text-highlight2 hover:bg-highlight2 hover:text-primary"
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
  );
};
