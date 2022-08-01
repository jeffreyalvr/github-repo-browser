import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Main from "../../components/Main";
import NotFoundContainer from "../../components/NotFoundContainer";
import Footer from "../../components/Footer";

import "./styles.css";

const NotFound = () => {
  return (
    <Wrapper>
      <Header size="small"></Header>
      <Main>
        <NotFoundContainer />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default NotFound;
