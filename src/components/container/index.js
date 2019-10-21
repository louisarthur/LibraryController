import styled from 'styled-components';

const Container = styled.div`
  max-height: 1000px;
  background: #231e23;
  font-family: Arial, Helvetica, sans-serif;
  margin: 60px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0.1);
  h1 {
    color: yellow;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }
    a {
      color: yellow;
      font-size: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      color: yellow;
    }
  }
`;

export default Container;
