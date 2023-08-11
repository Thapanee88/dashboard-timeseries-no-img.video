interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedValue: Option) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(options.find((option) => option.value === e.target.value)!)} /* Remove the parseInt conversion */>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
