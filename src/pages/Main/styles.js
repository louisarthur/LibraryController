import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 25px;
  display: flex;
  flex-direction: row;

  input,
  select {
    flex: 1;
    border: 1px solid #eeee;
    border-radius: 4px;
    padding: 10px 15px;
    & + input,
    & + select {
      margin-left: 20px;
    }

    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;

const rotate = keyframes`
  from {
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: yellow;
  border: 0;
  padding: 0 10px;
  margin-left: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  font-size: 17px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #eee;
    & + li {
      border-top: 1px solid #eeeeee;
    }
  }
`;
export const Span = styled.span`
  display: flex;
  flex-direction: row;
  button {
    background: yellow;
    border: 0;
    padding: 5px 10px;
    margin-left: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
