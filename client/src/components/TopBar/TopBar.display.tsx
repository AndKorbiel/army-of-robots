import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomMessage, { MesseageTypeProps } from "../CustomMessage";

type TopBarDisplayProps = {
  handleScrap: Function;
  handleLogOut: Function;
  isLoggedIn: boolean;
  userEmail: string;
  alertMessage: MesseageTypeProps;
};

function TopBarDisplay({
  handleScrap,
  handleLogOut,
  isLoggedIn,
  userEmail,
  alertMessage,
}: TopBarDisplayProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            My army of robots
          </Typography>
          <Link to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="add-task">
            <Button color="inherit">Add new task</Button>
          </Link>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => handleScrap()}
          >
            Scrap data
          </Button>
          {isLoggedIn ? (
            <>
              <Typography variant="body1" sx={{ margin: "0 10px" }}>
                Logged in as: {userEmail}
              </Typography>

              <Button
                color="inherit"
                variant="outlined"
                onClick={() => handleLogOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <CustomMessage
        isVisible={alertMessage.isVisible}
        type={alertMessage.type}
        text={alertMessage.text}
      />
    </Box>
  );
}

export default TopBarDisplay;
