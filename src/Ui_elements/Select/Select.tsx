import { Select } from "antd";
import styled from "styled-components";

interface SelectProps {
  options: any;
  onChange: (value: any) => void;
  defaultValue: string;
  width?: number | string;
}

export const SelectInput = ({
  options,
  onChange,
  defaultValue,
  width
}: SelectProps) => {
  return (
    <SelectElement
      defaultValue={defaultValue}
      style={{ width: width || 120 }}
      onChange={onChange}
      options={options}
    />
  );
};

const SelectElement = styled(Select)`
  .ant-select-selector{
    border-color: var(--primary-color) !important;
    background-color: transparent !important;
  }
  .ant-select-selection-item{
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
  }
  .ant-select-arrow{
    color: var(--primary-color);
  }
`;
