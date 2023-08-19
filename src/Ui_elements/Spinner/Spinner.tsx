import { ThreeDots } from "react-loader-spinner";
export const Spinner = ({ color }: any) => {
  return (
    <ThreeDots
      height="20"
      width="20"
      radius="9"
      color={color || "#ffff"}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
};
