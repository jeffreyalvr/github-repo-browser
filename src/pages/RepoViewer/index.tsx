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
          <UserContainer
            name="matheusunitt"
            profile_pic="https://media-exp1.licdn.com/dms/image/C4E03AQHImwgrtQYQZQ/profile-displayphoto-shrink_800_800/0/1585886879084?e=1665014400&v=beta&t=eLFMGPucO8dpjuDH83LUfiRIxsSSoD_LbYALI2bgUe4"
          />
        </ResultContainerWrapper>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default RepoViewer;
