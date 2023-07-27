import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface SearchProps {
  onSearch?: () => void;
}

export const SearchInput = ({ onSearch }: SearchProps) => {
  return (
    <SearchContainer>
      <input placeholder="search" />
      <div>
        <SearchIcon />
      </div>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 200px;
  display: flex;
  background-color: var(--dashboardBackground);
  border-radius: 12px;
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

  >div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    transition: all ease .3s;
    &:hover{
        background-color: #F5E9FF;
        cursor: pointer;    
    }
  }
`;

const SearchIcon = styled(SearchOutlined)`
  color: gray;
  font-size: 1rem;
`;
