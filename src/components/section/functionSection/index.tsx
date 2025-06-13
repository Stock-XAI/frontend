import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";

const contents = [
  {
    image: "/1_basic.png",
    alt: "Basic Stock Data",
    text: "Check the detailed historical stock data of the selected item. You can view and compare Low, Open, High, and Close values based on your objective.",
  },
  {
    image: "/2_news.png",
    alt: "Stock News",
    text: "Browse the latest news related to the selected stock. We've curated only the most relevant information to support your investment decisions. Click the “More” button to see full details.",
  },
  {
    image: "/3_column.png",
    alt: "Prediction Influence",
    text: "The stock price prediction is based on the most recent 10 data points. Discover which specific dates had the greatest influence on the prediction.",
  },
  {
    image: "/4_area.png",
    alt: "Feature Importance",
    text: "Analyze trends in the detailed data. See how elements like date, Low, and High values contributed to the prediction outcome.",
  },
  {
    image: "/5_posneg.png",
    alt: "Impact Analysis",
    text: "Easily view daily change rates alongside each data point’s contribution to the prediction. Understand how much impact each input had on the result.",
  },
];

const FunctionSection = () => {
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(contents.length).fill(false)
  );
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (el) => el === entry.target
          );
          if (index !== -1) {
            setVisibleSections((prev) => {
              const next = [...prev];
              next[index] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper>
      {contents.map((item, index) => (
        <Section
          key={index}
          ref={(el) => {
            if (el) sectionRefs.current[index] = el;
          }}
          $isVisible={visibleSections[index]}
        >
          <HalfBox>
            <img
              src={item.image}
              alt={item.alt}
              style={{ width: "100%", height: "auto" }}
            />
          </HalfBox>
          <HalfBox>
            <QuoteBlock>
              <QuoteIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
                aria-hidden="true"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </QuoteIcon>
              <QuoteText>{item.text}</QuoteText>
            </QuoteBlock>
          </HalfBox>
        </Section>
      ))}
    </Wrapper>
  );
};

export default FunctionSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 100px;
`;

const Section = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) =>
    $isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease-in-out;
`;

const HalfBox = styled.div`
  width: 50%;
`;

const QuoteBlock = styled.blockquote`
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 600;
  color: ${({ theme }) => theme.grayColor.gray100 || "#111827"};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
`;

const QuoteIcon = styled.svg`
  width: 32px;
  height: 32px;
  color: #9ca3af;
  margin-bottom: 16px;
`;

const QuoteText = styled.p`
  max-width: 700px;
  line-height: 1.6;
  color: ${({ theme }) => theme.grayColor.gray100 || "#111827"};
`;
