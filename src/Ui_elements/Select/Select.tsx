import { Select } from "antd";
import styled from "styled-components";
import { devices } from "../../utils/mediaQueryBreakPoints";

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
  width,
}: SelectProps) => {
  return (
    <SelectElement
      defaultValue={defaultValue}
      style={{
        width: width || "100%",
      }}
      onChange={onChange}
      options={options}
    />
  );
};

const SelectElement = styled(Select)`
  @media ${devices.tabletL} {
    width: 100% !important;
  }
  .ant-select-selector {
    padding: 1rem;
    border-color: var(--primary-color) !important;
    background-color: transparent !important;
  }
  .ant-select-selection-item {
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
  }
  .ant-select-arrow {
    color: var(--primary-color);
    margin-top: -4%;
    @media ${devices.tabletL} {
    margin-top: -1% !important;
  }
  }
  .anticon {
    font-size: 0.8rem;
  }
`;
