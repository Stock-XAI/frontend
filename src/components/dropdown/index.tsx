import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownIcon from "../../assets/arrow-down.svg";
import { styled } from "styled-components";

const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: 0,
    y: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.2 },
  },
};

type Props = {
  onSelect: (o: number) => void;
  horizon: number;
};

function Dropdown({ horizon, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(horizon);
  const options = [1, 7, 30];

  const handleOnClick = (option: number) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <DisplayWrapper onClick={() => setIsOpen((prev) => !prev)}>
        After {selected} Day
        <img src={DownIcon} width="20px" height="20px" />
      </DisplayWrapper>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            style={{
              position: "absolute",
              listStyle: "none",
              padding: 0,
              marginTop: "-12px",
              backgroundColor: "#202020",
              zIndex: 1,
              width: "100%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "0 0 16px 16px",
            }}
          >
            {options.map((option) => (
              <li
                key={option}
                style={{
                  padding: "12px 12px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => handleOnClick(option)}
              >
                After {option} Day
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;

export const DisplayWrapper = styled.button`
  all: unset; /* 브라우저 기본 스타일 제거 */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.grayColor.gray100};
  background: ${({ theme }) => theme.grayColor.gray800};
  padding: 0 20px;
  height: 56px;
  border-radius: 16px;
  cursor: pointer;
`;
