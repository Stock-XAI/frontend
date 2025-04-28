import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Stock, StockInfo } from "../../types/stock";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useStockInfo, useStockSearch } from "../../hooks/useStockQuery";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

function Detail() {
  const [searchParams] = useSearchParams();
  const _ticker = searchParams.get("ticker") || "";
  const [ticker, setTicker] = useState(_ticker);
  const [keyword, setKeyword] = useState("");
  const [stockPredictionResult, setStockPredictionResult] = useState<
    StockInfo | undefined
  >(undefined);
  const [searchResult, setSearchResult] = useState<Stock[]>([]);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const { data: stockInfoData } = useStockInfo({ ticker });

  const { data: searchData } = useStockSearch(
    { keyword },
    keyword.length == 0 //disabled -> 검색어가 없을 때
  );

  useEffect(() => {
    if (searchData) {
      setSearchResult(searchData);
    }
  }, [searchData]);

  const stockChartData = useMemo(() => {
    return stockInfoData?.data.chartData.map((item) => ({
      x: new Date(item.date),
      y: [item.open, item.high, item.low, item.close],
    }));
  }, [stockInfoData?.data.chartData]);

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
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
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
    }
  }, [stockInfoData]);

  const handleStockPrediction = (item: Stock) => {
    setTicker(item.ticker);
    setKeyword(item.ticker);
  };

  return (
    <>
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
        </SearchWrapper>
      </Main>

      <Container>
        {stockPredictionResult && (
          <>
            <Section>
              <h1>{stockPredictionResult.ticker} Stock Prediction Report</h1>
            </Section>

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
              <NewsList>
                {stockPredictionResult.news.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                    <span>{item.sentiment === "positive" ? "👍" : "👎"}</span>
                  </li>
                ))}
              </NewsList>
            </Section>
            <SectionWrapper>
              <Section>
                <h2>Prediction Results</h2>
                <p>
                  <strong>Prediction:</strong>{" "}
                  {stockPredictionResult.prediction.result}
                </p>
                <p>
                  <strong>Horizon:</strong>{" "}
                  {stockPredictionResult.prediction.horizon}
                </p>
              </Section>

              <Section>
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
              </Section>
            </SectionWrapper>
          </>
        )}
      </Container>
    </>
  );
}

export default Detail;

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

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 200px 40px;
  gap: 16px;
  background-color: ${({ theme }) => theme.systemColor.black};
`;

const Container = styled.div`
  margin-top: 70px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Section = styled.section`
  padding: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor.gray300};
  background-color: ${({ theme }) => theme.systemColor.white};
  h1,
  h2 {
    margin-bottom: 16px;
  }
`;

const NewsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.grayColor.gray100};
    padding: 12px;
    border-radius: 8px;
  }

  p {
    margin: 4px 0;
  }

  span {
    font-size: 20px;
  }
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
