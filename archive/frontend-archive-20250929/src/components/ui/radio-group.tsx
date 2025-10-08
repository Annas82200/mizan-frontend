import React, { createContext, useContext, useState } from "react";

interface RadioGroupContextType {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({ 
  value, 
  onValueChange, 
  defaultValue = "", 
  name = "radio-group",
  className = "",
  children 
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <div className={`space-y-2 ${className}`} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroupItem({ 
  value, 
  id, 
  disabled = false, 
  className = "",
  children 
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);
  
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { value: selectedValue, onChange, name } = context;
  const isSelected = selectedValue === value;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-mizan-teal border-gray-300 focus:ring-mizan-teal focus:ring-2"
      />
      {children && (
        <label 
          htmlFor={id} 
          className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'} cursor-pointer`}
        >
          {children}
        </label>
      )}
    </div>
  );
}
