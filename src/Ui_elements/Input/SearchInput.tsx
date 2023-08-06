import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

interface SearchProps {
  onSearch?: () => void;
  width?: string;
}

export const SearchInput = ({ onSearch, width }: SearchProps) => {
  return (
    <SearchContainer width={width}>
      <input placeholder="search" />
      <div>
        <SearchIcon />
      </div>
    </SearchContainer>
  );
};

const SearchContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  display: flex;
  background-color: var(--dashboardBackground);
  border-radius: 10px;
  justify-content: space-between;

  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.8rem;
    padding: 0.6rem 1rem;

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
