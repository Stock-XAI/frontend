import styled from "styled-components";
import SearchIcon from "../../assets/search.svg";
import AiIcon from "../../assets/ai.svg";
import AnalizeIcon from "../../assets/analize.svg";

const Timeline = () => {
  const releases = [
    {
      icon: SearchIcon,
      title: "Find a Stock",
      date: "Set a time range for the search (1, 7, 30 days)",
      description: "Easily search stocks by ticker or company name.",
    },
    {
      icon: AiIcon,
      title: "Predict Stock Price Using AI Model",
      date: " Prediction may take some time. Please wait.",
      description:
        "Utilize advanced AI models to forecast future stock prices.",
    },
    {
      icon: AnalizeIcon,
      title: "Analyze Prediction Result",
      date: "View graphs by date and data type.",
      description:
        "Gain insight with interactive visualizations and trend analysis.",
    },
  ];

  return (
    <TimelineList>
      {releases.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineHeader>
            <TimelineIconWrapper>
              <img src={item.icon} alt="icon" width="28px" height="28px" />
            </TimelineIconWrapper>
            <TimelineLine />
          </TimelineHeader>
          <TimelineContent>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineList>
  );
};

export default Timeline;

const TimelineList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 48px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const TimelineItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const TimelineHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TimelineIconWrapper = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.grayColor.gray100};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const TimelineLine = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
    flex: 1;
    height: 2px;
    background-color: ${({ theme }) => theme.grayColor.gray300};
    margin-left: 12px;
  }
`;

const TimelineContent = styled.div`
  @media (min-width: 640px) {
    padding-inline-end: 32px;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.grayColor.gray300};
`;

const TimelineDate = styled.time`
  font-size: 18px;
  color: #9ca3af;
  margin-bottom: 4px;
  display: block;
`;

const TimelineDescription = styled.p`
  font-size: 16px;
  color: #6b7280; // gray-500
  font-weight: 400;
`;
