import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import {
  ResultContainerWrapper,
  ReposContainer,
  UserContainer,
} from "../../components/ResultContainer";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

import "./styles.css";

const RepoViewer = () => {
  return (
    <Wrapper>
      <Header size="small" />
      <Main>
        <ResultContainerWrapper>
          <ReposContainer />
          <UserContainer />
        </ResultContainerWrapper>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default RepoViewer;
