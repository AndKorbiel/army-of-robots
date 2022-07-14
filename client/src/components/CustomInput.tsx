import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";

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
  align-items: baseline;
  justify-content: center;

  div {
    margin: 0 15px;
  }
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
      <div>
        <input
          id="title"
          name="title"
          placeholder="Page Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title ? (
          <Message className="warrning">{formik.errors.title}</Message>
        ) : null}
      </div>
      <div>
        <input
          id="src"
          name="src"
          placeholder="Page URL"
          onChange={formik.handleChange}
          value={formik.values.src}
        />
        {formik.errors.src ? (
          <Message className="warrning">{formik.errors.src}</Message>
        ) : null}
      </div>
      <div>
        <input
          id="selector"
          name="selector"
          placeholder="Target element CSS selector"
          onChange={formik.handleChange}
          value={formik.values.selector}
        />
        {formik.errors.selector ? (
          <Message className="warrning">{formik.errors.selector}</Message>
        ) : null}
      </div>
      <button>Submit</button>
    </CustomForm>
  );
}

export default CustomInput;
