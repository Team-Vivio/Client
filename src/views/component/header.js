import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import styles from "../../styles/component/header.module.css";
import useDetectClose from "../hooks/useDetectClose";
import { useCookies } from "react-cookie";
import { GrUser } from "react-icons/gr";

import vivio from "../../VIVIOmain.png";
// import userToken from '../../headertoken.png';

function Header() {
	const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
	const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);
	const [cookies, setCookie, removeCookie] = useCookies([
		"token",
		"socialToken",
	]);
	const [Isuser, setIsuser] = useState(false);

	function handleHomeClick() {
		window.location.href = "/";
	}

	// 페이지가 처음 로드될 때만 토큰을 설정하도록 수정
	useEffect(() => {
		const storedSocialToken = cookies.socialToken;
		if (storedSocialToken && !cookies.token) {
			setCookie("token", storedSocialToken, {
				path: "/",
				domain: "www.vivi-o.site",
			});
			console.log("설정 후 토큰 쿠키:", cookies.token);
		}
	}, []);

	// 토큰 상태를 체크하여 사용자 상태 업데이트
	useEffect(() => {
		if (
			!cookies.token ||
			cookies.token === undefined ||
			cookies.token === "undefined"
		) {
			setIsuser(false);
			console.log("사용자가 로그인되지 않음");
		} else {
			setIsuser(true);
			console.log("사용자가 로그인됨");
		}
	}, [cookies.token]);

	// 로그아웃 함수
	function handleLogoutClick() {
		// 쿠키에서 토큰을 제거하고 사용자 상태를 업데이트합니다.
		removeCookie("socialToken");
		removeCookie("token");
		window.location.href = "/";
	}

	function handleGuideClick() {
		window.location.href =
			"https://showy-track-86c.notion.site/VIVIO-9d22837b2dc740c6b18d6fef64891102?pvs=4";
	}

	function handleLoginClick() {
		window.location.href = "/Login";
	}
	function handleMypageClick() {
		window.location.href = "/MyPage";
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
			<div onClick={handleHomeClick} className={styles.logoleft}>
				<img
					// style={{ width :150, height: 'auto' }}
					src={vivio}
					alt="Vivio Logo"
				/>
			</div>
			<div className={styles.navelement} style={{ color: "#f1f1f1" }}>
				<div onClick={handleHomeClick}>
					<p>Home</p>
				</div>
				<div onClick={boardHandler} ref={boardRef}>
					<p>Service</p>
					<Menu isDropped={boardIsOpen}>
						<Ul>
							<Li>
								<LinkWrapper onClick={handleCraft1Click}>
									나만의 패션 찾기
								</LinkWrapper>
							</Li>
							<Li>
								<LinkWrapper onClick={handleCraft2Click}>
									웜톤 & 쿨톤 찾기
								</LinkWrapper>
							</Li>
							<Li>
								<LinkWrapper onClick={handleCraft3Click}>
									비슷한 옷 찾기
								</LinkWrapper>
							</Li>
							<Li>
								<LinkWrapper onClick={handleCraft4Click}>
									나만의 코디 찾기
								</LinkWrapper>
							</Li>
						</Ul>
					</Menu>
				</div>
				<div onClick={handleGuideClick}>
					<p>Guide</p>
				</div>
				{Isuser && (
					<div>
						<GrUser
							onClick={myPageHandler}
							ref={myPageRef}
							style={{ width: "4vw", height: "4vh" }}
						/>
						<Menu isDropped={myPageIsOpen}>
							<Ul>
								<Li>
									<LinkWrapper onClick={handleMypageClick}>
										마이페이지
									</LinkWrapper>
								</Li>
								<Li>
									<LinkWrapper onClick={handleLogoutClick}>
										로그아웃
									</LinkWrapper>
								</Li>
							</Ul>
						</Menu>
					</div>
				)}
				{!Isuser && (
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

	font-family: "NanumSquareRoundOTF";
	font-style: normal;
	font-weight: 800;
	font-size: 20px;
	line-height: 140%;
	/* identical to box height, or 28px */
	letter-spacing: 0.02em;
	text-transform: capitalize;

	color: #ffffff;

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
