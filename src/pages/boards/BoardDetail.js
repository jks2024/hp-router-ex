import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 20px;
`;

const Card = styled.article`
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  color: #888;
`;

// 줄바꿈(\n)을 그대로 보여주기 위해 pre-wrap 사용
const Content = styled.p`
  margin: 0;
  min-height: 200px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const BackBtn = styled.button`
  margin-top: 16px;
  padding: 10px 18px;
  background-color: #999;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 18px;
  cursor: pointer;
`;
