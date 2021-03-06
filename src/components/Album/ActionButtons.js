import React, { useState } from 'react';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';
import { BsHeartFill } from 'react-icons/bs';

const UpdBlock = styled.div`
  width: 70%;
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
`;
const ActionButton = styled.button`
  border: none;
  border-radius: 4px;
  width: 47%;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #ffb6c1;

  &:hover {
    background: #ff4d67;
  }

  & + & {
    margin-left: 0.75rem;
  }
`;

const ActionButtons = ({ onRemove, onEdit, likes }) => {
  const [modal, setModal] = useState(false);

  const [like, setLike] = useState(likes ? true : false);

  const onChangeText = () => {
    setLike(!like);
  };

  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <UpdBlock>
        {like ? (
          <ActionButton
            onClick={() => {
              onEdit();
              onChangeText();
            }}
          >
            즐겨찾기 해제
          </ActionButton>
        ) : (
          <ActionButton
            onClick={() => {
              onEdit();
              onChangeText();
            }}
          >
            즐겨찾기
          </ActionButton>
        )}
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
        {like ? (
          <div>
            <BsHeartFill color="red" />
          </div>
        ) : (
          <div>
            <BsHeartFill color="black" />
          </div>
        )}
      </UpdBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default ActionButtons;
