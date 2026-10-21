import styled, { css } from "styled-components";
import React from "react";

const StyledBtn = styled.button`
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: orange;
  font-weight: 700;

  ${(props) =>
    props.enabled &&
    css`
      background-color: orange;
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;

const Button = ({ enabled, onClick, children }) => {
  return (
    <StyledBtn enabled={enabled} onClick={onClick}>
      {children}
    </StyledBtn>
  );
};

export default Button;
