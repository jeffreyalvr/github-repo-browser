import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Main from "../../components/Main";
import ResultContainer from "../../components/ResultContainer";
import Footer from "../../components/Footer";

const RepoViewer = () => {
  return (
    <Wrapper>
      <Header size="small" />
      <Main>
        <ResultContainer />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default RepoViewer;
