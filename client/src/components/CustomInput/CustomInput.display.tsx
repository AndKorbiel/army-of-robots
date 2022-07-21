import CustomMessage, { MesseageTypeProps } from "../CustomMessage";
import { CustomInputData, CustomFormFields } from "./CustomInput";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ChangeEventHandler, FormEventHandler } from "react";

type CustomInputDisplayProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: any;
  errors: any;
  alertMessage: MesseageTypeProps;
  inputFields: Array<CustomFormFields>;
};

const CustomForm = styled.form`
  display: grid;
  align-items: center;
  justify-content: center;
`;

function CustomInputDisplay({
  handleSubmit,
  handleChange,
  values,
  errors,
  alertMessage,
  inputFields,
}: CustomInputDisplayProps) {
  return (
    <CustomForm onSubmit={handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        {inputFields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            onChange={handleChange}
            value={values[field.id as keyof typeof values]}
            helperText={
              errors[field.id as keyof typeof errors]
                ? errors[field.id as keyof typeof errors]
                : null
            }
            error={errors[field.id as keyof typeof errors] !== undefined}
          />
        ))}
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ height: "55px" }}
        >
          Submit
        </Button>
      </Box>
      <CustomMessage
        isVisible={alertMessage.isVisible}
        type={alertMessage.type}
        text={alertMessage.text}
      />
    </CustomForm>
  );
}

export default CustomInputDisplay;
