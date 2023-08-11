import React from 'react';
import Select from 'react-select';
import { IDropdownImg } from '../types/dropdownImg';

interface DropdownProps {
  options: IDropdownImg[];
  onSelect: (selectedValue: IDropdownImg) => void;
}

export const DropdownImg: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    optionLabel: {
      marginLeft: '8px',
    },
  };

  const customOption = ({ innerProps, label, data }: any) => (
    <div {...innerProps}>
      {data.img && <img src={data.img} alt={label} height={150} width={150} />}
      <span style={customStyles.optionLabel}>{label}</span>
    </div>
  );

  return (
    <Select
      options={options}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value.toString()}
      styles={customStyles}
      components={{ Option: customOption }}
      onChange={(selectedOption) => onSelect(selectedOption as IDropdownImg)}
    />
  );
};