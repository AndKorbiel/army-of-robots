import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type HeadingProps = {
  text: String;
};

const CustomTypo = styled(Typography)(({ theme }) => ({
  background: "#e8eef0",
  padding: "10px 0",
  fontSize: "2em",
  marginBottom: "2em",
  color: theme.palette.primary.main,
}));

function IntroHeading({ text }: HeadingProps) {
  return (
    <CustomTypo variant="h3" gutterBottom>
      {text}
    </CustomTypo>
  );
}

export default IntroHeading;
