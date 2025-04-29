import { useState } from "react";
import ArrowLeftIcon from "../../assets/arrow-left.svg";
import ArrowRightIcon from "../../assets/arrow-right.svg";
import styled from "styled-components";
import { News } from "../../types/stock";

const items = ["A", "B", "C", "D", "E", "F"];

type Props = {
  data: News[];
};

export default function Carousel({ data }: Props) {
  const [centerIndex, setCenterIndex] = useState(0);

  const handleNext = () => {
    if (centerIndex < items.length - 2) {
      setCenterIndex(centerIndex + 1);
    }
  };

  const handlePrev = () => {
    if (centerIndex > 1) {
      setCenterIndex(centerIndex - 1);
    }
  };

  return (
    <CarouselWrapper>
      <NavButton onClick={handlePrev}>
        <img src={ArrowLeftIcon} width="30px" height="30px" />
      </NavButton>
      <CarouselContainer>
        {data.map((item, i) => {
          const offset = i - centerIndex;
          const isCenter = offset === 0;
          const isVisible = offset >= -1 && offset <= 1;
          return (
            <CarouselItem
              key={i}
              offset={offset}
              isCenter={isCenter}
              isVisible={isVisible}
              onClick={() =>
                window.open(item.link, "_blank", "noopener,noreferrer")
              }
            >
              <TitleWrapper isCenter={isCenter}>{item.title}</TitleWrapper>
              <SummaryWrapper>{item.summary}</SummaryWrapper>
              {item.pubDate}
              {item.provider}
            </CarouselItem>
          );
        })}
      </CarouselContainer>
      <NavButton onClick={handleNext}>
        <img src={ArrowRightIcon} width="30px" height="30px" />
      </NavButton>
    </CarouselWrapper>
  );
}

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
`;

export const NavButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grayColor.gray600};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.grayColor.gray800};
  }

  opacity: 0.5;
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

export const TitleWrapper = styled.h1<{ isCenter: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  font-size: 24px;
  padding: 10px;
  background-color: ${({ theme, isCenter }) =>
    isCenter ? theme.grayColor.gray800 : theme.grayColor.gray100};
`;

export const SummaryWrapper = styled.h3`
  color: ${({ theme }) => theme.grayColor.gray500};
  font-size: 18px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 10px;
`;
export const CarouselItem = styled.div<{
  offset: number;
  isCenter: boolean;
  isVisible: boolean;
}>`
  position: absolute;
  width: 450px;
  height: 500px;
  /* background: ${({ isCenter, theme }) =>
    isCenter
      ? `linear-gradient(to bottom, ${theme.grayColor.gray100}, ${theme.grayColor.gray800})`
      : `linear-gradient(to bottom, ${theme.grayColor.gray100}, ${theme.grayColor.gray200})`}; */
  border: ${({ isCenter, theme }) =>
    isCenter
      ? `1px solid ${theme.grayColor.gray400}`
      : `1px solid ${theme.grayColor.gray100}`};
  border-radius: 10px;
  transition:
    transform 0.4s,
    opacity 0.4s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: ${({ isCenter }) => (isCenter ? 2 : 1)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  transform: ${({ offset, isCenter }) =>
    isCenter ? `scale(1.2) translateX(0%)` : `translateX(${offset * 120}%)`};
  box-shadow: ${({ isCenter }) =>
    isCenter
      ? "0 8px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.15)"};
`;
