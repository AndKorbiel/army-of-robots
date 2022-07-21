import IntroHeading from "../components/IntroHeading";
import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import { useAppDispatch } from "../state/hooks";
import { logIn } from "../state/usersSlice";
import CustomInputDisplay from "../components/CustomInput/CustomInput.display";
import { CustomFormFields } from "../components/CustomInput/CustomInput";
import { MesseageTypeProps } from "../components/CustomMessage";
// mui
import { Container } from "@mui/material";

type LoginData = {
  userName: string;
  userPass: string;
};

const validate = (values: LoginData): void => {
  const errors: any = {};

  for (let [key, value] of Object.entries(values)) {
    if (!value || value.length < 3) {
      errors[key] = "This fields is required";
    }
  }
  return errors;
};

function LoginPage() {
  const dispatch = useAppDispatch();

  const [alertMessage, setAlertMessage] = useState<MesseageTypeProps>({
    isVisible: false,
    type: "error",
    text: "",
  });

  const initialVal: LoginData = {
    userName: "",
    userPass: "",
  };

  const formik = useFormik({
    initialValues: initialVal,
    validate,
    onSubmit: (values) => {
      dispatch(logIn(values));
    },
  });

  const inputFields: Array<CustomFormFields> = [
    { id: "userName", name: "userName", label: "User name" },
    { id: "userPass", name: "userPass", label: "User password" },
  ];

  return (
    <div>
      <IntroHeading text="Login" />
      <Container maxWidth="xl">
        <CustomInputDisplay
          handleSubmit={formik.handleSubmit}
          handleChange={formik.handleChange}
          values={formik.values}
          errors={formik.errors}
          alertMessage={alertMessage}
          inputFields={inputFields}
        />
      </Container>
    </div>
  );
}

export default LoginPage;
