import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (e: any) => void;
  width?: number;
  ref?:  React.Ref<HTMLInputElement>; 
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ onSearch, width, value, ...restProps }, ref) => {
    return (
      <SearchContainer width={width}>
        <input
          ref={ref}
          placeholder="search"
          onChange={onSearch}
          value={value}
          {...restProps}
        />
        <div>
          <SearchIcon />
        </div>
      </SearchContainer>
    );
  }
);

const SearchContainer = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? width + "px" : "100%")};
  display: flex;
  background-color: var(--dashboardBackground);
  border-radius: 10px;
  justify-content: space-between;
  -webkit-box-shadow: 0 0 0 2px rgba(123, 49, 178, 0.3);
  box-shadow: 0 0 0 2px rgba(123, 49, 178, 0.3);
  &:focus-within {
    border: 1px solid var(--primary-color);
    background-color: transparent;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    padding: 8px 20px;

    &::placeholder {
      font-size: 0.8rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    transition: all ease 0.3s;

    &:hover {
      background-color: #f5e9ff;
      cursor: pointer;
    }
  }
`;

const SearchIcon = styled(SearchOutlined)`
  color: gray;
  font-size: 1rem;
`;
