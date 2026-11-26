import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import MENUS from "../components/layout/menu";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Hello = styled.div`
  h1 {
    margin: 0 0 6px;
    font-size: 26px;
  }
  p {
    margin: 0;
    color: #6b7280;
  }
`;

// 메인 화면에서 바로 AI 에게 질문 → /ai?q=질문 으로 이동
const AskBox = styled.form`
  display: flex;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 16px;

  input {
    flex: 1;
    min-width: 0;
    padding: 12px 14px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    outline: none;
  }
  button {
    padding: 0 18px;
    font-weight: 700;
    color: #4f46e5;
    background: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 16px;
  color: #374151;
`;

// 화면 너비에 맞춰 1~3열로 자동 배치
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
`;

const Card = styled.button`
  text-align: left;
  padding: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-top: 4px solid ${(p) => p.$color};
  border-radius: 14px;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.1s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
  .icon {
    font-size: 28px;
  }
  h3 {
    margin: 8px 0 6px;
    font-size: 18px;
    color: #111827;
  }
  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: #6b7280;
  }
`;

const Recent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;

  li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    font-size: 14px;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
  }
  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background: #f9fafb;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meta {
    flex-shrink: 0;
    color: #9ca3af;
    font-size: 12px;
  }
`;

const Empty = styled.p`
  margin: 0;
  padding: 16px;
  color: #9ca3af;
  font-size: 14px;
  background: white;
  border-radius: 14px;
`;

const Home = () => {
  const nav = useNavigate();
  const [question, setQuestion] = useState("");
  const [recent, setRecent] = useState([]);
  const email = localStorage.getItem("email");

  // 최근 게시글 5개
  useEffect(() => {
    AxiosApi.boardList()
      .then((res) => setRecent(res.data.slice(0, 5)))
      .catch((err) => console.error(err));
  }, []);

  const onAsk = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    nav(`/ai?q=${encodeURIComponent(question.trim())}`);
  };

  return (
    <Container>
      <Hello>
        <h1>안녕하세요 👋</h1>
        <p>{email} 님, 무엇을 할까요?</p>
      </Hello>

      <AskBox onSubmit={onAsk}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="게시판 AI 도우미에게 바로 질문하기 (예: 스터디 모임은 언제 하나요?)"
          maxLength={500}
        />
        <button type="submit">질문</button>
      </AskBox>

      <section>
        <SectionTitle>메뉴</SectionTitle>
        <Cards>
          {MENUS.map((m) => (
            <Card
              key={m.to}
              type="button"
              $color={m.color}
              onClick={() => nav(m.to)}
            >
              <div className="icon">{m.icon}</div>
              <h3>{m.label}</h3>
              <p>{m.desc}</p>
            </Card>
          ))}
        </Cards>
      </section>

      <section>
        <SectionTitle>최근 게시글</SectionTitle>
        {recent.length === 0 ? (
          <Empty>아직 게시글이 없습니다.</Empty>
        ) : (
          <Recent>
            {recent.map((b) => (
              <li key={b.boardId} onClick={() => nav(`/board/${b.boardId}`)}>
                <span className="title">{b.title}</span>
                <span className="meta">
                  {b.name || b.email} · {b.regDate?.substring(0, 10)}
                </span>
              </li>
            ))}
          </Recent>
        )}
      </section>
    </Container>
  );
};

export default Home;
