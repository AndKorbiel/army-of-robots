import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type CustomInputData = {
  title: string;
  src: string;
  selector: string;
};

const Message = styled.p`
  color: red;
`;

const CustomForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const validate = (values: CustomInputData): void => {
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

  const formik = useFormik({
    initialValues: initialVal,
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("/tasks", values);
        console.log(res.data);
        resetForm();
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="title"
          name="title"
          label="Page Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          helperText={formik.errors.title ? formik.errors.title : null}
          error={formik.errors.title !== undefined}
        />
        <TextField
          id="src"
          name="src"
          label="Page URL"
          onChange={formik.handleChange}
          value={formik.values.src}
          helperText={formik.errors.src ? formik.errors.src : null}
          error={formik.errors.src !== undefined}
        />
        <TextField
          id="selector"
          name="selector"
          label="Target element CSS selector"
          onChange={formik.handleChange}
          value={formik.values.selector}
          helperText={formik.errors.selector ? formik.errors.selector : null}
          error={formik.errors.selector !== undefined}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ height: "55px" }}
        >
          Submit
        </Button>
      </Box>
    </CustomForm>
  );
}

export default CustomInput;
