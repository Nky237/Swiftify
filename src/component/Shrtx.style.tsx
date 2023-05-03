import styled from "styled-components";

export const Container =styled.div`
  padding-top: 20px;


  h1{
    color: #285495;
    font-weight: 400;
    font-size: 24px;
    padding: 20px;
    
  }
`
export interface InputProps {
  $primary?: boolean;

}
export const Blue = styled.div `
  background-color: #285495;
  height: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding-bottom: 20px;

  h3{
    padding-bottom: 13px;
  }

`
export const Button = styled.button`
  padding: 10px;
  background-color: #347AB9;
  color: white;
  border: none;
  width: 200px;
  height: 43px;

  /* &:hover {
    background-color: #f7ad70;
    border: 2px solid #FF943C;
  } */
`;

export const Input = styled.input`
  padding: 10px;
  width: 720px !important;
  margin: auto;
  background-color: white;
  color: #AB9F9E;
  height: 43px;
  border: none;
`;
export const Para = styled.td`
    background-color: transparent;
    color: black;
    padding-left: 20px;
    width: 5%;
    border: 1px solid black;
    cursor: pointer;
`
export const Flex = styled.div`
  display: flex;
`;
export const Table = styled.table`
  text-align: center;
  border: 1px solid black;
  border-collapse: collapse;

  th{
    border: 1px solid black;
  }
`