import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Main from "../../components/Main";
import NotFoundContainer from "../../components/NotFoundContainer";
import Footer from "../../components/Footer";

const NotFound = () => {
  return (
    <Wrapper>
      <Header size="small" />
      <Main>
        <NotFoundContainer />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default NotFound;
