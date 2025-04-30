import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useStockSearch } from "../../hooks/useStockQuery";
import { Stock } from "../../types/stock";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const sections = ["Preview", "Method", "Model", "Main Function"];

function Home() {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [active, setActive] = useState("Preview");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) setActive(id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { data: searchData } = useStockSearch(
    { keyword },
    keyword.length == 0 //disabled -> 검색어가 없을 때
  );

  useEffect(() => {
    if (searchData) {
      setSearchResult(searchData);
    }
  }, [searchData]);

  const scrollToSection = (id: string) => {
    const index = sections.findIndex((sec) => sec === id);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStockPrediction = (item: Stock) => {
    navigate("/detail?ticker=" + item.ticker);
  };

  return (
    <>
      <Navbar>
        <img src={logo} alt="logo" style={{ width: "40px", height: "auto" }} />
        {sections.map((item) => (
          <NavItem
            key={item}
            onClick={() => scrollToSection(item)}
            $active={active === item}
          >
            {item}
          </NavItem>
        ))}
      </Navbar>
      <Main>
        <Title>Stock XAI.</Title>
        <SubContent>
          You can utilize stock prediction results. <br />
          By leveraging numerous supporting factors, you will be able to make
          even more accurate inferences.
        </SubContent>
        <SearchWrapper>
          <Input
            placeholder="Enter the Stock Ticker or Name."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword.length > 0 && searchResult.length > 0 && (
            <SearchResultContainer>
              <ul>
                {searchResult.map((item) => (
                  <StockInfoItem
                    key={item.ticker}
                    onClick={() => {
                      handleStockPrediction(item);
                    }}
                  >
                    <strong>{item.ticker}</strong> - {item.name}
                  </StockInfoItem>
                ))}
              </ul>
            </SearchResultContainer>
          )}
          {keyword.length > 0 && searchResult.length === 0 && (
            <SearchResultContainer>
              <h3>No results found.</h3>
            </SearchResultContainer>
          )}
        </SearchWrapper>
      </Main>

      <Container>
        {sections.map((item, index) => (
          <Section
            key={item}
            ref={(el: HTMLElement | null): void => {
              if (el) sectionRefs.current[index] = el;
            }}
            data-id={item}
          >
            <h2>{item}</h2>
            <p>This is the {item} section with some dummy text.</p>
            <DummyContent />
          </Section>
        ))}
      </Container>
    </>
  );
}

export default Home;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  gap: 36px;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.systemColor.black};
  color: white;
  align-items: center;
  padding: 0 30px;
  z-index: 1000;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor.gray800}`};
`;

const Input = styled.input`
  width: 100%;
  height: 70px;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.grayColor.gray600};
  border-radius: 16px;
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayColor.gray100};
  margin-top: 32px;
  transition: 0.2s;
  background-color: ${({ theme }) => theme.grayColor.gray700};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.grayColor.gray200};
  }
  &::placeholder {
    color: ${({ theme }) => theme.grayColor.gray400};
    font-size: 24px;
    font-weight: 400;
  }
`;

const SubContent = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayColor.gray400};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 200px 40px;
  gap: 16px;
  background-color: ${({ theme }) => theme.systemColor.black};
`;

const Title = styled.div`
  font-size: 96px;
  font-weight: 700;
  color: ${({ theme }) => theme.grayColor.gray100};
  margin-top: 32px;
`;

const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active, theme }) =>
    $active ? theme.systemColor.white : theme.grayColor.gray500};
  transition: 0.2s;
`;

const Container = styled.div`
  margin-top: 70px;
`;

const Section = styled.section`
  height: 100vh;
  padding: 100px 40px 40px;
  background-color: ${({ theme }) => theme.systemColor.white};
  border-bottom: 1px solid #ccc;

  h2 {
    font-size: 2rem;
    margin-bottom: 16px;
  }
`;

const DummyContent = () => (
  <div>
    {[...Array(5)].map((_, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
        vestibulum magna.
      </p>
    ))}
  </div>
);

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchResultContainer = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.systemColor.white};
  border: 1px solid ${({ theme }) => theme.grayColor.gray400};
  border-radius: 8px;
  z-index: 999;
  padding: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 16px;
    color: ${({ theme }) => theme.grayColor.gray500};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const StockInfoItem = styled.li`
  padding: 16px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.grayColor.gray100};
  }
`;
