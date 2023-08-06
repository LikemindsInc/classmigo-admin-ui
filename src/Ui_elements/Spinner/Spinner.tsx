import { ThreeDots } from "react-loader-spinner";
export const Spinner = () => {
  return (
    <ThreeDots
      height="20"
      width="20"
      radius="9"
      color="#ffff"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
};
