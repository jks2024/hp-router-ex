// 상단 메뉴와 홈 화면 카드가 함께 쓰는 메뉴 목록
// 메뉴를 추가할 때는 여기 한 곳만 고치면 헤더와 홈 카드에 모두 반영됩니다.
const MENUS = [
  {
    to: "/board",
    label: "게시판",
    icon: "📋",
    desc: "글을 쓰고 읽고 댓글을 남겨요. 글을 쓰면 AI 검색에 자동으로 색인돼요.",
    color: "#f97316",
  },
  {
    to: "/chat",
    label: "채팅",
    icon: "💬",
    desc: "채팅방을 만들고 실시간으로 대화해요.",
    color: "#0ea5e9",
  },
  {
    to: "/ai",
    label: "AI 도우미",
    icon: "🤖",
    desc: "게시판 글을 근거로 답하는 AI에게 질문해요. 출처와 실행 경로도 보여 줘요.",
    color: "#4f46e5",
  },
];

export default MENUS;
