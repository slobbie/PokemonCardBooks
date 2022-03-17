import styled from 'styled-components';
import Cards from '../components/Card';

const Home = () => {
  return (
    <Section>
      <Cards />
    </Section>
  );
};

export default Home;

const Section = styled.section`
  background-color: ${(props) => props.theme.bgColor};
`;
