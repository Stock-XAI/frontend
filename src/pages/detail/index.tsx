import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Stock, StockInfo } from "../../types/stock";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useStockInfo, useStockSearch } from "../../hooks/useStockQuery";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Carousel from "../../components/slider";
import RiseIcon from "../../assets/rise.svg";
import FallIcon from "../../assets/fall.svg";
import Dropdown from "../../components/dropdown";
import ColumnChart from "../../components/charts/column";
import AreaChart from "../../components/charts/area";
import PosNegChart from "../../components/charts/posneg";

function Detail() {
  const [searchParams] = useSearchParams();
  const _ticker = searchParams.get("ticker") || "";
  const _horizon = searchParams.get("horizon") || "";
  const [ticker, setTicker] = useState(_ticker);

  const [keyword, setKeyword] = useState("");
  const [horizon, setHorizon] = useState(Number(_horizon));
  const [stockPredictionResult, setStockPredictionResult] = useState<
    StockInfo | undefined
  >(undefined);
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { data: stockInfoData } = useStockInfo({
    ticker,
    horizon: horizon,
  });

  const menus = ["By Date", "By Stock Price", "By Change"];

  const [activeIndex, setActiveIndex] = useState(0);

  const { data: searchData } = useStockSearch(
    { keyword },
    keyword.length == 0 //disabled -> 검색어가 없을 때
  );

  useEffect(() => {
    if (searchData) {
      setSearchResult(searchData);
    }
  }, [searchData]);

  useEffect(() => {
    if (ticker) {
      setIsSearching(true);
    }
  }, [ticker]);

  useEffect(() => {
    if (horizon) {
      setIsSearching(true);
    }
  }, [horizon]);

  useEffect(() => {
    if (isSearching) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearching]);

  const stockChartData = useMemo(() => {
    return stockInfoData?.data.chartData.map((item) => ({
      x: new Date(item.date),
      y: [item.open, item.high, item.low, item.close],
    }));
  }, [stockInfoData?.data.chartData]);

  const DateData = useMemo(() => {
    const result: Record<string, number[]> = {};
    const tokens = stockInfoData?.data.explanation.tokens;
    const tokenScores = stockInfoData?.data.explanation.token_scores;

    if (!tokens || !tokenScores) return {};

    for (let i = 0; i < tokens.length; i += 7) {
      const date = tokens[i].replace(",", "");
      const rawScores = tokenScores.slice(i, i + 7);

      const scores = rawScores.map((score) => Number(score.toFixed(3)));

      result[date] = scores;
    }

    return result;
  }, [stockInfoData?.data.explanation]);

  useEffect(() => {
    setState({
      ...state,
      series: [
        { data: stockChartData || [] }, //항상 배열로 넣기
      ],
    });
  }, [stockChartData]);

  //setState 저장 필요 + 차트 옵션 설정
  const [state, setState] = useState<{
    series: {
      data: { x: Date; y: number[] }[];
    }[];
    options: ApexOptions;
  }>({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "candlestick" as const,
        zoom: {
          enabled: false,
        },
        height: 350,
      },
      title: {
        text: "Historical stock price data",
        align: "center",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });

  useEffect(() => {
    setKeyword(ticker);
  }, []);

  useEffect(() => {
    if (stockInfoData) {
      setStockPredictionResult(stockInfoData.data);
      setIsSearching(false);
    }
  }, [stockInfoData]);

  const handleStockPrediction = (item: Stock) => {
    setTicker(item.ticker);
    setKeyword(item.ticker);
  };

  return (
    <div style={{ position: "relative" }}>
      <Navbar>
        <div onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", height: "auto" }}
          />
        </div>
      </Navbar>
      <Main>
        <SearchWrapper>
          <Dropdown horizon={horizon} onSelect={setHorizon} />
          <InputWrapper>
            <Input
              placeholder="Enter the Stock Ticker or Name."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocused(false);
                }, 200);
              }}
            />
            {isFocused && keyword.length > 0 && searchResult.length > 0 && (
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
            {isFocused && keyword.length > 0 && searchResult.length === 0 && (
              <SearchResultContainer>
                <h3>No results found.</h3>
              </SearchResultContainer>
            )}
          </InputWrapper>
        </SearchWrapper>
      </Main>
      <Container>
        {stockPredictionResult && (
          <>
            <Title>
              📊 {stockPredictionResult.ticker} Stock Prediction Report
            </Title>
            <ResultWrapper>
              Predicted for {horizon} days from now
              <ContentWrapper>
                <img
                  src={
                    stockPredictionResult.prediction.result > 0
                      ? RiseIcon
                      : FallIcon
                  }
                  width="64px"
                  height="64px"
                />
                {stockPredictionResult.prediction.result}
              </ContentWrapper>
            </ResultWrapper>

            <Section>
              <h2>Basic Information</h2>
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="candlestick"
                height={350}
              />
            </Section>

            <Section>
              <h2>Related News</h2>
              <Carousel data={stockPredictionResult.news} />
            </Section>
            <Section>
              <h2>Detail Exaplanations</h2>
              <MenuWrapper>
                <Highlight
                  style={{ transform: `translateX(${activeIndex * 100}%)` }}
                />
                {menus.map((label, index) => (
                  <MenuItem
                    key={label}
                    isActive={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {label}
                  </MenuItem>
                ))}
              </MenuWrapper>
              <div
                style={{
                  height: "80px",
                }}
              ></div>
              {/* <div>hihihi</div> */}

              {activeIndex == 0 ? (
                <ColumnChart data={DateData} />
              ) : activeIndex == 1 ? (
                <AreaChart />
              ) : (
                <PosNegChart />
              )}
            </Section>
            <SectionWrapper>
              {/* <Section>
                <h2>Inferences</h2>
                <p>{stockPredictionResult.explanation.why}</p>
                <ul>
                  {stockPredictionResult.explanation.features.map(
                    (feature, idx) => (
                      <li key={feature}>
                        {feature} → SHAP:{" "}
                        {stockPredictionResult.explanation.shapValues[idx]}
                      </li>
                    )
                  )}
                </ul>
              </Section> */}
            </SectionWrapper>
          </>
        )}
      </Container>
      {isSearching && (
        <Overlay>
          <Spinner />
          Analyzing...
        </Overlay>
      )}
    </div>
  );
}

export default Detail;

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

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  background: ${({ theme }) => theme.grayColor.gray100};
  overflow: hidden;
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
  color: ${({ isActive, theme }) =>
    isActive ? theme.systemColor.white : theme.grayColor.gray400};
  transition: color 0.3s ease;
`;

const Highlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 100%;
  background-color: ${({ theme }) => theme.grayColor.gray700};
  transition: transform 0.3s ease;
  z-index: 0;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  flex-direction: column;
  pointer-events: all;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 100px;
  margin: 30px;
  padding-bottom: 20px;
  position: relative;
  font-size: 20px;
  color: ${({ theme }) => theme.grayColor.gray600};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(to right, #ffffff, #808080);
    animation: drawLine 1.2s ease-out forwards;
  }

  @keyframes drawLine {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 48px;
  color: ${({ theme }) => theme.systemColor.black};
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 0 10px;
`;

const Input = styled.input`
  width: 100%;
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 160px 32px;
  gap: 14px;
  background-color: ${({ theme }) => theme.systemColor.black};
`;

const Container = styled.div`
  margin-top: 28px;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 32px;
  /* border-bottom: 1px solid ${({ theme }) => theme.grayColor.gray300}; */
  background-color: ${({ theme }) => theme.systemColor.white};
  h1,
  h2 {
    margin-bottom: 14px;
  }
  font-size: 16px;
  gap: 20px;
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

const Spinner = styled.div`
  border: 6px solid rgba(255, 255, 255, 0.2);
  border-top: 6px solid #ffffff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
