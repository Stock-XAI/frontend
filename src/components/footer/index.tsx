import styled from "styled-components";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <TopRow>
          <LogoLink href="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "40px", height: "auto" }}
            />
            <BrandName>StockXAI</BrandName>
          </LogoLink>
          <NavList>
            <NavItem href="https://github.com/orgs/Stock-XAI/repositories">
              github
            </NavItem>
            {/* <NavItem href="#">Privacy Policy</NavItem>
            <NavItem href="#">Licensing</NavItem>
            <NavItem href="#">Contact</NavItem> */}
          </NavList>
        </TopRow>
        <FooterDivider />
        <FooterNote>
          © 2025 <a href="/">StockXAI™</a>. All Rights Reserved.
        </FooterNote>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.systemColor.black};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 80px 40px;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 32px 16px;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

const BrandName = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.grayColor.gray300};
  white-space: nowrap;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-right: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.grayColor.gray500 || "#6b7280"};
`;

const NavItem = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterDivider = styled.hr`
  margin: 24px 0;
  border: 1px solid ${({ theme }) => theme.grayColor.gray600};
`;

const FooterNote = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.grayColor.gray500 || "#6b7280"};
  text-align: center;
  a {
    color: inherit;
    text-decoration: underline;
  }
`;
