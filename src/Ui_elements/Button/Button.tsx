import "../../index.css";
import { Button } from "antd";
import { ButtonProps } from "antd";

interface ButtonProp extends ButtonProps {
  label: any;
    width?: number;
  onClick?: () => void;
}

export const ButtonElement = ({ label, width, ...otherProps }: ButtonProp) => {
    return <Button
        style={{
            background: "var(--primary-color)",
            color: "white",
            width: width || "100%",
            height: "3rem",
            fontWeight:700
        }}
        {...otherProps}
    >
        {label}
    </Button>;
};
