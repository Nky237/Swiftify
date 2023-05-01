import styled from "styled-components";


export interface InputProps {
  $primary?: boolean;

}
export const Blue = styled.div `
  background-color: #454A90;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: white;

`
export const Button = styled.button`
  padding: 10px;
  background-color: #FF943C;
  color: white;
  border: none;

  &:hover {
    background-color: #f7ad70;
    border: 2px solid #FF943C;
  }
`;

export const Input = styled.input<InputProps>`
  padding: 10px;
  background-color: ${(props) => (props.$primary ? "transparent" : "white")};
  border: 2px solid #FF943C;
  color: ${(props) => (props.$primary ? "white" : "black")};
  border: ${(props) => (props.$primary ? "2px solid #FF943C" : 'none' )};
  width: ${(props) => (props.$primary ? "200px" : '300px' )};
`;
export const Para = styled.p`
    background-color: transparent;
    color: #FF943C;
    border: 2px solid #FF943C;
    width: 200px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: white;
`
export const Flex = styled.div`
  display: flex;
`;