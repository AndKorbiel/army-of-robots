import axios from "axios";
import { useFormik } from "formik";

type CustomInputData = {
  title: string;
  src: string;
  selector: string;
};

const validate = (values: CustomInputData): void => {
  const errors: any = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length < 15) {
    errors.title = "Must be 15 characters or less";
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
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/tasks", values);
        console.log(res.data);
      } catch (e: any) {
        console.log(e.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="title"
        name="title"
        placeholder="Page Title"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title ? <div>{formik.errors.title}</div> : null}
      <input
        id="src"
        name="src"
        placeholder="Page URL"
        onChange={formik.handleChange}
        value={formik.values.src}
      />
      <input
        id="selector"
        name="selector"
        placeholder="Target element CSS selector"
        onChange={formik.handleChange}
        value={formik.values.selector}
      />
      <button>Submit</button>
    </form>
  );
}

export default CustomInput;
