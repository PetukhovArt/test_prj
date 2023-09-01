import { ReactNode } from "react";
import Button from "@mui/material/Button";

type TransferButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};
export const TransferButton = ({
  children,
  onClick,
  disabled,
}: TransferButtonProps) => {
  return (
    <Button
      sx={{ my: 0.5 }}
      variant="contained"
      size="small"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
