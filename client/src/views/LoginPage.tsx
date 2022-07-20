import IntroHeading from "../components/IntroHeading";
import { useState } from "react";
import { useAppDispatch } from "../state/hooks";
import { logIn } from "../state/usersSlice";
// mui
import { Container } from "@mui/material";

type LoginData = {
  userName: string;
  userPass: string;
};

function LoginPage() {
  const dispatch = useAppDispatch();

  const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    userPass: "",
  });

  const handleChange = (e: any) => {
    let { userName: name, userPass: pass } = loginData;

    e.target.name === "userName"
      ? (name = e.target.value)
      : (pass = e.target.value);

    setLoginData({
      userName: name,
      userPass: pass,
    });
  };

  const handleSubmit = async () => {
    try {
      dispatch(logIn(loginData));
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <IntroHeading text="Login" />
      <Container maxWidth="xl">
        <>
          <input
            type="text"
            placeholder="User name"
            name="userName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Password"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={() => handleSubmit()} type="submit">
            Submit
          </button>
          <p>{loginData.userName}</p>
          <p>{loginData.userPass}</p>
        </>
      </Container>
    </div>
  );
}

export default LoginPage;
