import axios from "axios";
import { MesseageTypeProps } from "../CustomMessage";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { getUserData, logOut } from "../../state/usersSlice";
import TopBarDisplay from "./TopBar.display";

function TopBar() {
  const [alertMessage, setAlertMessage] = useState<MesseageTypeProps>({
    isVisible: false,
    type: "error",
    text: "",
  });

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  const handleScrap = async () => {
    try {
      const data = await axios.get("/tasks/scrap");
      setAlertMessage({
        isVisible: true,
        type: "success",
        text: data.data,
      });
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
  };

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  useEffect(() => {
    dispatch(getUserData({}));
  }, [dispatch]);

  return (
    <TopBarDisplay
      handleScrap={handleScrap}
      handleLogOut={handleLogOut}
      isLoggedIn={isLoggedIn}
      userEmail={userEmail}
      alertMessage={alertMessage}
    />
  );
}

export default TopBar;
