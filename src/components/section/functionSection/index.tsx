import { styled } from "styled-components";

const FunctionSection = () => {
  return (
    <Wrapper>
      <Section>
        <HalfBox>
          <img
            src="/1_basic.png"
            alt="Stock Prediction Chart"
            style={{ width: "100%", height: "auto" }}
          />
        </HalfBox>
        <HalfBox></HalfBox>
      </Section>
      <Section>
        <HalfBox>
          <img
            src="/2_news.png"
            alt="Stock Prediction Chart"
            style={{ width: "100%", height: "auto" }}
          />
        </HalfBox>
        <HalfBox></HalfBox>
      </Section>
      <Section>
        <HalfBox>
          <img
            src="/3_column.png"
            alt="Stock Prediction Chart"
            style={{ width: "100%", height: "auto" }}
          />
        </HalfBox>
        <HalfBox></HalfBox>
      </Section>
      <Section>
        <HalfBox>
          <img
            src="/4_area.png"
            alt="Stock Prediction Chart"
            style={{ width: "100%", height: "auto" }}
          />
        </HalfBox>
        <HalfBox></HalfBox>
      </Section>
      <Section>
        <HalfBox>
          <img
            src="/5_posneg.png"
            alt="Stock Prediction Chart"
            style={{ width: "100%", height: "auto" }}
          />
        </HalfBox>
        <HalfBox></HalfBox>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 100px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HalfBox = styled.div`
  width: 50%;
`;

export default FunctionSection;
