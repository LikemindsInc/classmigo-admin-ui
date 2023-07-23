import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
export const Loader = () => {
  return (
    <Container>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
