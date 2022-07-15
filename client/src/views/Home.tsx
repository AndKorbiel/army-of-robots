import CustomList from "../components/CustomList";
import IntroHeading from "../components/IntroHeading";
import Container from "@mui/material/Container";

function Home() {
  return (
    <div>
      <IntroHeading text={"Tasks list"} />
      <Container maxWidth="xl">
        <CustomList />
      </Container>
    </div>
  );
}

export default Home;
