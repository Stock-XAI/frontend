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
  const [centerIndex, setCenterIndex] = useState(1);

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
      <NavButton onClick={handlePrev} isPossible={centerIndex > 1}>
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
            >
              <TitleWrapper isCenter={isCenter}>{item.title}</TitleWrapper>
              <SummaryWrapper>{item.summary}</SummaryWrapper>
              <BottomWrapper>
                <MoreButton
                  onClick={() =>
                    window.open(item.link, "_blank", "noopener,noreferrer")
                  }
                >
                  More
                  <img src={ArrowRightIcon} width="20px" height="20px" />
                </MoreButton>
                <DetailWrapper>
                  <ProviderWrapper>{item.provider}</ProviderWrapper>
                  <DateWrapper>{item.pubDate.split("T")[0]}</DateWrapper>
                </DetailWrapper>
              </BottomWrapper>
            </CarouselItem>
          );
        })}
      </CarouselContainer>
      <NavButton
        onClick={handleNext}
        isPossible={centerIndex < items.length - 2}
      >
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

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  padding: 8px;
`;

export const NavButton = styled.button<{ isPossible: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grayColor.gray600};
  border: none;
  display: ${({ isPossible }) => (isPossible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.grayColor.gray800};
  }

  opacity: 0.5;
`;

export const MoreButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.grayColor.gray700};
  opacity: 0.8;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 16px;
  opacity: 0.5;
  color: ${({ theme }) => theme.systemColor.white};
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProviderWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: 15px;
  color: ${({ theme }) => theme.grayColor.gray800};
  font-weight: bold;
  width: 100%;
  padding: 0 8px;
`;

export const DateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: end;
  font-size: 16px;
  color: ${({ theme }) => theme.grayColor.gray500};
  padding: 12px;
  padding-top: 4px;
  padding-bottom: 16px;
`;

export const TitleWrapper = styled.h1<{ isCenter: boolean }>`
  margin: 0;
  line-height: 1.3;
  width: 100%;
  padding: 16px;
  border-radius: 8px 8px 0px 0px;
  background-color: ${({ theme, isCenter }) =>
    isCenter ? theme.grayColor.gray800 : theme.grayColor.gray100};
  color: ${({ isCenter, theme }) =>
    isCenter ? theme.grayColor.gray100 : theme.grayColor.gray800};
  font-size: 16px;
`;

export const SummaryWrapper = styled.h3`
  margin: 0;
  line-height: 1.3;
  color: ${({ theme }) => theme.grayColor.gray500};
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(1.3em * 10);
  padding: 0 10px;
  width: 100%;
  text-decoration: underline dotted ${({ theme }) => theme.grayColor.gray200};
  text-underline-offset: 2px;
`;

export const CarouselItem = styled.div<{
  offset: number;
  isCenter: boolean;
  isVisible: boolean;
}>`
  position: absolute;
  width: 360px;
  height: 400px;
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
  align-items: start;
  justify-content: start;
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
