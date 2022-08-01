import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import SearchContainer from "../../components/SearchContainer";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

import "./styles.css";

const Home = () => {
  return (
    <Wrapper>
      <Header size="big"></Header>
      <Main>
        <SearchContainer />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Home;
