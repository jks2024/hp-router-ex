import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { clearAuth } from "../api/AxiosInstance";
import MENUS from "../components/layout/menu";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f8;
`;

// 스크롤해도 위에 붙어 있는 헤더
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderInner = styled.div`
  max-width: 960px;
  height: 60px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 24px;

  /* 좁은 화면: 1줄 = 로고 + 로그아웃, 2줄 = 메뉴 */
  @media (max-width: 640px) {
    height: auto;
    padding: 10px 16px 8px;
    flex-wrap: wrap;
    gap: 8px 12px;
  }
`;

const Logo = styled(NavLink)`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  text-decoration: none;
  white-space: nowrap;

  span {
    color: orange;
  }
`;

// 메뉴가 많아지거나 화면이 좁으면 가로로 스크롤
const Nav = styled.nav`
  flex: 1;
  display: flex;
  gap: 4px;
  overflow-x: auto;

  @media (max-width: 640px) {
    order: 3; /* 로고·로그아웃 아래 줄로 */
    flex-basis: 100%;
  }
`;

// NavLink 는 현재 주소와 맞으면 class="active" 를 붙여 줌
const MenuLink = styled(NavLink)`
  padding: 8px 14px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
  }
  &.active {
    color: white;
    background-color: #111827;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
  margin-left: auto;

  @media (max-width: 640px) {
    .email {
      display: none; /* 좁은 화면에서는 이메일 숨김 */
    }
  }
`;

const LogoutBtn = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  color: #374151;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 99px;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
`;

const Layout = () => {
  const nav = useNavigate();
  const email = localStorage.getItem("email");

  // 로그인하지 않았으면 Layout 안의 화면(홈·게시판·채팅·AI)에 들어갈 수 없음
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/" replace />;
  }

  const onLogout = async () => {
    try {
      await AxiosApi.memberLogout(); // 서버의 Refresh Token 삭제
    } catch (e) {
      console.error(e); // 서버 오류여도 화면에서는 로그아웃 처리
    }
    clearAuth();
    nav("/", { replace: true });
  };

  return (
    <Container>
      <Header>
        <HeaderInner>
          <Logo to="/home">
            mini<span>·</span>prj
          </Logo>
          <Nav>
            <MenuLink to="/home">홈</MenuLink>
            {MENUS.map((m) => (
              <MenuLink key={m.to} to={m.to}>
                {m.icon} {m.label}
              </MenuLink>
            ))}
          </Nav>
          <User>
            <span className="email">{email}</span>
            <LogoutBtn type="button" onClick={onLogout}>
              로그아웃
            </LogoutBtn>
          </User>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        mini-prj · 게시판 AI 도우미 (Spring Boot · FastAPI · LangGraph · React)
      </Footer>
    </Container>
  );
};

export default Layout;
