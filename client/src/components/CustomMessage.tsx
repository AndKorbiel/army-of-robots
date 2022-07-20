import Alert, { AlertColor } from "@mui/material/Alert";
import Box from "@mui/material/Box";

export type MesseageTypeProps = {
  isVisible: boolean;
  type?: AlertColor;
  text?: string;
};

function CustomMessage({ isVisible, type, text }: MesseageTypeProps) {
  return (
    <>
      {isVisible ? (
        <Box sx={{ flex: "0 0 100%", padding: "10px" }}>
          <Alert severity={type}>{text}</Alert>
        </Box>
      ) : null}
    </>
  );
}

export default CustomMessage;
