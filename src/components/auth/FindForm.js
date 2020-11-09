import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Form } from "react-bootstrap";
import { Input } from "reactstrap";

const FindFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }

  // 간편 로그인 버튼
  .login_box {
    margin: 5% 0;
  }
  .api_img {
    width: 80%;
    border-radius: 6px;
  }

  .kep-login-facebook {
    font-size: 0;
    background-image: url(../images/fackbookicon.png) !important;
  }
  .login_form {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .login_form p {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
  }
  .content_name {
    display: none;
  }
  input:focus + .content_name,
  input:valid + .content_name {
    position: absolute;
    top: -10px;
    left: 16px;
    background: #ffffff;
    font-size: 13px;
    font-weight: bold;
    color: #f58cb4;
    display: inline;
  }
  .form-control {
    padding: 1.3rem;
  }
  .form-control:focus {
    border: 2px solid #f58cb4;
    box-shadow: none;
  }
  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  .emailbtn {
    color: #f58cb4;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 1.125rem;
    border: 1px solid #f58cb4;
    background: #fff;
    &:hover {
      background: #f58cb49d;
    }
    &:focus {
      outline: none;
      border: 2px dotted #f58cb4;
      border-radius: 4px;
    }
  }
  p {
    text-align: center;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
  .ma_ra {
    float: left;
    text-decoration: underline;
  }
  .ma_le {
    float: right;
    text-decoration: underline;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  findid: "아이디 찾기",
  findpw: "비밀번호 찾기",
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const FindForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <FindFormBlock>
      <Container>
        <form onSubmit={onSubmit}>
          {type === "findid" ? null : (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="email"
                name="email"
                placeholder="아이디(이메일)"
                onChange={onChange}
                value={form.email}
                required
              />
              <span className="content_name pl-1 pr-1">아이디(이메일)</span>
            </Form.Group>
          )}
          {type === "registercode" && (
            <Form.Group controlId="formBasicEmail" className="login_form">
              <Input
                autoComplate="emailcode"
                name="emailcode"
                placeholder="코드 입력"
                onChange={onChange}
                value={form.emailcode}
                required
              />
              <span className="content_name pl-1 pr-1">이메일 인증 번호</span>
            </Form.Group>
          )}
          {type === "findid" && (
            <>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  autoComplate="name"
                  name="name"
                  placeholder="이름"
                  onChange={onChange}
                  value={form.name}
                  required
                />
                <span className="content_name pl-1 pr-1">이름</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  autoComplate="birthday"
                  name="birthday"
                  placeholder="년 월 일"
                  onChange={onChange}
                  value={form.birthday}
                  required
                />
                <span className="content_name pl-1 pr-1">생년 월 일</span>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="login_form">
                <Input
                  autoComplate="hp"
                  name="hp"
                  placeholder="전화번호"
                  onChange={onChange}
                  value={form.hp}
                  required
                />
                <span className="content_name pl-1 pr-1">전화번호</span>
              </Form.Group>
            </>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem " }}>
            {text}
          </ButtonWithMarginTop>
        </form>
        <Footer>
          {type === "findid" ? (
            <Link to="/findpw">
              <span className="ma_ra">비밀번호 찾기</span>
            </Link>
          ) : (
            <Link to="/findid">
              <span className="ma_ra">아이디 찾기</span>
            </Link>
          )}
          <Link to="/login">
            <span className="ma_le">로그인</span>
          </Link>
        </Footer>
      </Container>
    </FindFormBlock>
  );
};

export default FindForm;
