import { Container } from "@mui/material";
import CustomInput from "../components/CustomInput/CustomInput";
import IntroHeading from "../components/IntroHeading";

function AddTaskPage() {
  return (
    <div>
      <IntroHeading text="Add new task" />
      <Container maxWidth="xl">
        <CustomInput />
      </Container>
    </div>
  );
}

export default AddTaskPage;
