import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { MesseageTypeProps } from "../CustomMessage";
import CustomInputDisplay from "./CustomInput.display";

export type CustomInputData = {
  title: string;
  src: string;
  selector: string;
};

export type CustomFormFields = {
  id: string;
  name: string;
  label: string;
};

export const validate = (values: CustomInputData): void => {
  const errors: any = {};

  for (let [key, value] of Object.entries(values)) {
    if (!value || value.length < 3) {
      errors[key] = "This fields is required";
    }
  }
  return errors;
};

function CustomInput() {
  const initialVal: CustomInputData = {
    title: "",
    src: "",
    selector: "",
  };

  const [alertMessage, setAlertMessage] = useState<MesseageTypeProps>({
    isVisible: false,
    type: "error",
    text: "",
  });

  const formik = useFormik({
    initialValues: initialVal,
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("/tasks", values);
        setAlertMessage({
          isVisible: true,
          type: "success",
          text: res.data,
        });
        resetForm();
        setTimeout(() => {
          setAlertMessage({ isVisible: false });
        }, 3000);
      } catch (e: any) {
        setAlertMessage({
          isVisible: true,
          type: "error",
          text: e.message,
        });
      }
    },
  });

  const inputFields: Array<CustomFormFields> = [
    { id: "title", name: "title", label: "Page Title" },
    { id: "src", name: "src", label: "Page URL" },
    { id: "selector", name: "selector", label: "Target element CSS selector" },
  ];

  return (
    <CustomInputDisplay
      handleSubmit={formik.handleSubmit}
      handleChange={formik.handleChange}
      values={formik.values}
      errors={formik.errors}
      alertMessage={alertMessage}
      inputFields={inputFields}
    />
  );
}

export default CustomInput;
