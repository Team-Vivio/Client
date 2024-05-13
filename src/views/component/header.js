import React from "react";
import {useState} from "react";
import styled, { css } from "styled-components";
import styles from "../../styles/component/header.module.css"
import useDetectClose from "../hooks/useDetectClose";
import { GrUser } from "react-icons/gr";

import vivio from '../../VIVIOmain.png';
// import userToken from '../../headertoken.png';



function Header() {
    const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
    const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);
	function handleHomeClick() {
		window.location.href = "/";
	}

	function handleGuideClick() {
		// window.location.href = "/projects";
	}

	function handleLoginClick() {
		window.location.href = "/Login";
	}
    function handleMypageClick(){
        window.location.href = "/MyPage"
    }
    function handleCraft1Click() {
		window.location.href = "/FashionRecommend";
	}
    function handleCraft2Click() {
		window.location.href = "/PersonalColor";
	}
    function handleCraft3Click() {
		window.location.href = "/ClothesFinder";
	}
    function handleCraft4Click() {
		window.location.href = "/CoordiFinder";
	}

    const [Isuser, setIsuser] = useState(true);
	return (
		<div
			style={{
						borderTop: 0,
						borderLeft: 0,
						borderRight: 0,
						borderBottom: 2,
						borderStyle: "solid",
						borderColor: "white",
					  }}
			className={styles.headercontainer}
		>
			<div className={styles.logoleft}>
					<img
						// style={{ width :150, height: 'auto' }}
						src={vivio}
						alt="Vivio Logo"
					/>
			</div>
			<div
				className={styles.navelement}
				style={{ color: "#f1f1f1" }}
			>
				<div onClick={handleHomeClick}>
					<p>Home</p>
				</div>
				<div onClick={boardHandler} ref={boardRef}><p>Service</p>
                <Menu isDropped={boardIsOpen}>
                    <Ul>
                        <Li>
                        <LinkWrapper onClick={handleCraft1Click}>나만의 패션찾기</LinkWrapper>
                        </Li>
                        <Li>
                        <LinkWrapper onClick={handleCraft2Click}>웜톤 & 쿨톤 분석</LinkWrapper>
                        </Li>
                        <Li>
                        <LinkWrapper onClick={handleCraft3Click}>옷 검색하기</LinkWrapper>
                        </Li>
                        <Li>
                        <LinkWrapper onClick={handleCraft4Click}>나만의 코디 찾기</LinkWrapper>
                        </Li>
                    </Ul>
                </Menu>
                </div>
				<div onClick={handleGuideClick}>
					<p>Guide</p>
				</div>
                {Isuser  &&(
                <div>
                    <GrUser onClick={myPageHandler} ref={myPageRef} style={{width:"4vw", height:"4vh"}}/>
                    <Menu isDropped={myPageIsOpen}>
                    <Ul>
                        <Li>
                        <LinkWrapper onClick={handleMypageClick}>마이페이지</LinkWrapper>
                        </Li>
                        <Li>
                        <LinkWrapper>로그아웃</LinkWrapper>
                        </Li>
                    </Ul>
                </Menu>
                </div>
                )}
                {!Isuser &&(
                    <div onClick={handleLoginClick}>
                    <p>Login / Signin</p>
                    </div>
                )}
			</div>
		</div>
	);
}

export default Header;

const Menu = styled.div`
    background: rgba(202, 202, 202, 0.5);
    position: absolute;
    top: 100%;
    width: 200px;
    text-align: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    z-index: 9;

    font-family: 'NanumSquareRoundOTF';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 140%;
    /* identical to box height, or 28px */
    letter-spacing: 0.02em;
    text-transform: capitalize;

    color: #FFFFFF;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    transform: translateY(-50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: white;
`;