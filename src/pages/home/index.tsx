import { useEffect, useRef, useState } from "react"; //useRef,
import { styled } from "styled-components";
import { useStockSearch } from "../../hooks/useStockQuery";
import { Stock } from "../../types/stock";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Dropdown from "../../components/dropdown";

const sections = ["Preview"]; //"Method", "Model", "Performance"

const PreviewSection = () => (
  <Wrapper>
    <img src="/report.png" alt="Stock Prediction Chart" width="1000px" />
    <Heading>
      For smarter investing, <Highlight>make the most</Highlight> of our
      service.
    </Heading>
    <SubText>
      Get <Strong>predicted stock prices</Strong> for all US and Korean stocks.{" "}
      <br />
      See forecasts for <Strong>1-day, 7-day, and 30-day</Strong> trends.
    </SubText>
    <SubText>
      We provide more than just predictions — access the{" "}
      <Strong>latest news</Strong> <br />
      and detailed <Strong>explanation reports</Strong> behind every forecast.
    </SubText>
    <Summary>
      Based on our model’s results and reasoning, <br />
      <Emphasis>
        we’ll support you in making smarter investment decisions.
      </Emphasis>
    </Summary>
  </Wrapper>
);
const MethodSection = () => <p>Here are some amazing features.</p>;
const ModelSection = () => <p>Check out our pricing options.</p>;
const PerformanceSection = () => <p>Frequently Asked Questions</p>;

const sectionComponentMap: { [key: string]: React.ComponentType } = {
  Preview: PreviewSection,
  Method: MethodSection,
  Model: ModelSection,
  Performance: PerformanceSection,
};

function Home() {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [active, setActive] = useState("Preview");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const navigate = useNavigate();
  const [horizon, setHorizon] = useState(1);

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
    navigate(`/detail?ticker=${item.ticker}&horizon=${horizon}`);
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
          <Dropdown onSelect={setHorizon} horizon={horizon} />
          <InputWrapper>
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
          </InputWrapper>
        </SearchWrapper>
      </Main>

      <Container>
        {sections.map((item, index) => {
          const SectionComponent = sectionComponentMap[item] || DummyContent;

          return (
            <Section
              key={item}
              ref={(el: HTMLElement | null): void => {
                if (el) sectionRefs.current[index] = el;
              }}
              data-id={item}
            >
              {/* <h2>{item}</h2> */}
              <SectionComponent />
            </Section>
          );
        })}
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
  height: 64px;
  width: 100%;
  background-color: ${({ theme }) => theme.systemColor.black};
  color: white;
  align-items: center;
  padding: 0 24px;
  z-index: 1000;
  border-bottom: ${({ theme }) => `1px solid ${theme.grayColor.gray800}`};
`;

const Input = styled.input`
  /* width: 100%; */
  flex-grow: 1;
  height: 56px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.grayColor.gray600};
  border-radius: 16px;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayColor.gray100};
  transition: 0.2s;
  background-color: ${({ theme }) => theme.grayColor.gray700};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.grayColor.gray200};
  }
  &::placeholder {
    color: ${({ theme }) => theme.grayColor.gray400};
    font-size: 20px;
    font-weight: 400;
  }
`;

const SubContent = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayColor.gray400};
  padding-bottom: 10px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 160px 32px;
  gap: 14px;
  background-color: ${({ theme }) => theme.systemColor.black};
  /* height: 100%; */
`;

const Title = styled.div`
  font-size: 76px;
  font-weight: 700;
  color: ${({ theme }) => theme.grayColor.gray100};
  margin-top: 25px;
`;

const NavItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active, theme }) =>
    $active ? theme.systemColor.white : theme.grayColor.gray500};
  transition: 0.2s;
`;

const Container = styled.div`
  margin-top: 56px;
`;

const Section = styled.section`
  /* height: 100vh; */
  padding: 80px 32px 32px;
  background-color: ${({ theme }) => theme.systemColor.white};
  /* border-bottom: 1px solid #ccc; */

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
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  padding: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 14px;
    color: ${({ theme }) => theme.grayColor.gray500};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const StockInfoItem = styled.li`
  padding: 14px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.grayColor.gray100};
  }
`;

const Wrapper = styled.section`
  padding: 80px 24px;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa, #eef1f5);
  text-align: center;
  border-radius: 24px;
  /* max-width: 800px; */
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1f2d3d;
  line-height: 1.4;
`;

const Highlight = styled.span`
  color: #0070f3;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #4a4a4a;
  line-height: 1.8;
  margin-bottom: 24px;
`;

const Strong = styled.span`
  font-weight: bold;
  color: #222;
`;

const Summary = styled.div`
  margin-top: 32px;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #2a2a2a;
`;

const Emphasis = styled.span`
  font-weight: 600;
  color: #0070f3;
`;
