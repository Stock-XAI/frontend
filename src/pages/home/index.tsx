import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useStockSearch } from "../../hooks/useStockQuery";
import { Stock } from "../../types/stock";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Dropdown from "../../components/dropdown";
import FunctionSection from "../../components/section/functionSection";
import Footer from "../../components/footer";

const sections = ["Preview", "Function"]; //"Method", "Model", "Performance"

const PreviewSection = () => (
  <Wrapper>
    <Heading>Don’t blindly trust.</Heading>
    <HeadingSub>
      Evaluate the value of the information yourself before using it.
    </HeadingSub>
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
  Function: FunctionSection,
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
            console.log(id);
            if (id) setActive(id);
          }
        });
      },
      { threshold: 0.3 }
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
        {sections.map((item, id) => (
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
              <SectionComponent />
            </Section>
          );
        })}
      </Container>
      <Footer />
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
  padding-bottom: 0;
  gap: 14px;
  background-color: ${({ theme }) => theme.systemColor.black};
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
  background-color: ${({ theme }) => theme.systemColor.black};
`;

const Section = styled.section`
  padding: 80px 32px 32px;
  background-color: ${({ theme }) => theme.systemColor.black};

  h2 {
    font-size: 2rem;
    padding-bottom: 16px;
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
  text-align: center;
  border-radius: 24px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 70px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.grayColor.gray100};
  line-height: 1.4;
`;
const HeadingSub = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.grayColor.gray300};
  line-height: 1.4;
`;
