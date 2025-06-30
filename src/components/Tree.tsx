import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

const Item = styled.div<{ depth: number }>`
  border-top: 1px solid black;
  padding: 10px;
  padding-left: ${({ depth }) => depth * 20}px;
`;

export const Tree = {
  Container,
  Item,
};
