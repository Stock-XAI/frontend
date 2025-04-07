import { styled } from "styled-components";

function Home() {
  return (
    <Container>
      <h1>Stock XAI</h1>
      <p>Welcome to the Stock-XAI!</p>
    </Container>
  );
}
export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background}; // ✅ 추가된 부분
`;
