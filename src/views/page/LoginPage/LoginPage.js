import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import HorizonLine from "./HorizontalLine";
import styles from "../../../styles/LoginPage.module.css";
import mainLogo from "../../../img/VivioLogo.png";
import google from "../../../img/google.png";
import kakao from "../../../img/kakao.png";
import axios from "axios";
import FindPasswordModal from "../../component/Modal/FindPasswordModal";
import FindEmailModal from "../../component/Modal/FindEmailModal";

function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showModalE, setShowModalE] = useState(false);
	const [showModalP, setShowModalP] = useState(false);
	const [blur, setBlur] = useState(false);
	const outsideRef = useRef();
	// eslint-disable-next-line no-unused-vars
	const [_, setCookie] = useCookies(["token"]);
	const location = useLocation();
	const queryString = location.search;

	// url 쿼리파라미터 확인
	useEffect(() => {
		if (queryString === "?error=false") {
			alert(
				"일반 회원가입으로 이미 존재하는 계정입니다!\n일반 로그인으로 진행해주세요."
			);
			window.location.href = "/Login";
		}
	});

	// 엔터 클릭 시 로그인
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			onClickLogin();
		}
	};

	// 메인 로고 클릭 시 메인페이지로
	function handleMainClick() {
		window.location.href = "/";
	}

	// 구글 소셜 로그인 클릭 시
	function googleLoginClick() {
		window.location.href =
			"http://backend.vivi-o.site/oauth2/authorization/google";
	}

	// 카카오 소셜 로그인 클릭 시
	function kakaoLoginClick() {
		window.location.href =
			"https://backend.vivi-o.site/oauth2/authorization/kakao";
	}

	useEffect(() => {
		if (showModalE === false && showModalP === false) {
			setBlur(false);
		} else setBlur(true);
	}, [showModalE, showModalP]);

	// 이메일 찾기 모달 핸들러
	function showEmailModalHandler() {
		setShowModalE(true);
		setBlur(true);
	}

	// 비밀번호 찾기 모달 핸들러
	function showPasswordModalHandler() {
		setShowModalP(true);
		setBlur(true);
	}

	// 이메일 값
	function onChangeEmail(e) {
		setEmail(e.target.value);
	}

	// 비밀번호 값
	function onChangePassword(e) {
		setPassword(e.target.value);
	}

	// 회원가입 눌렀을 시, 페이지 이동
	function handleSignupClick() {
		window.location.href = "/Signup";
	}

	// 이메일이랑 비밀번호 넘기고, 토큰 받기
	function onClickLogin() {
		if (!(email === "" && password === "")) {
			axios
				.post("https://backend.vivi-o.site/users/signin", {
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.data.isSuccess) {
						const domain =
							window.location.hostname === "localhost"
								? "localhost"
								: "vivi-o.site";
						setCookie("token", res.data.result.token, { domain });
						window.location.href = "/";
					} else {
						alert("로그인이 실패. 이메일과 비밀번호를 확인해주세요");
					}
				});
		} else {
			alert("이메일 또는 비밀번호를 입력해주세요");
		}
	}

	return (
		<div className={styles.Bigpage}>
			<div
				styles={{ width: window.screen.width, height: window.screen.height }}
				className={blur ? styles.blurpage : styles.page}
			>
				<div>
					<img
						className={styles.logo}
						onClick={handleMainClick}
						src={mainLogo}
						alt="logo"
					/>
				</div>
				<div className={styles.titleWrap}>
					생생한 패션 생활, ViVio에서 시작하세요
				</div>
				<div className={styles.margin1}>
					<button onClick={googleLoginClick} className={styles.btnGoogle}>
						<img src={google} style={{width:"1.25vw", height:"auto"}} alt="googleLogo" />
						구글로 시작하기
					</button>
				</div>
				<div className={styles.margin2}>
					<button onClick={kakaoLoginClick} className={styles.btnKakao}>
						<img src={kakao} style={{width:"1.25vw", height:"auto"}} alt="kakaoLogo" />
						카카오로 시작하기
					</button>
				</div>
				<HorizonLine text="OR" />
				<div className={styles.inputWrap}>
					<div className={styles.inputTitle}>
						<div>이메일</div>
						<input
							onKeyDown={handleKeyDown}
							onChange={(e) => {
								onChangeEmail(e);
							}}
							className={styles.textEP1}
							placeholder="abcd@email.com"
						/>
					</div>
				</div>
				<div className={styles.inputWrap}>
					<div className={styles.inputTitle}>
						비밀번호
						<input
							onKeyDown={handleKeyDown}
							onChange={(e) => {
								onChangePassword(e);
							}}
							type="password"
							className={styles.textEP2}
							placeholder="비밀번호를 입력해주세요"
						/>
					</div>
				</div>
				<div>
					<button onClick={onClickLogin} className={styles.btnLogin}>
						로그인
					</button>
				</div>
				<div className={styles.bottomText1}>
					이메일 혹은 비밀번호를 잊으셨나요?
					<div onClick={showEmailModalHandler} className={styles.bottomfont}>
						이메일 찾기
					</div>
					<div onClick={showPasswordModalHandler} className={styles.bottomfont}>
						비밀번호 찾기
					</div>
				</div>
				<div className={styles.bottomText2}>
					아직 회원이 아니신가요?
					<div onClick={handleSignupClick} className={styles.bottomfont}>
						회원가입
					</div>
				</div>
			</div>
			{showModalE && (
				<div
					ref={outsideRef}
					onClick={(e) => {
						if (e.target === outsideRef.current) setShowModalE(false);
					}}
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
					}}
				>
					<FindEmailModal onClose={setShowModalE} />
				</div>
			)}
			{showModalP && (
				<div
					ref={outsideRef}
					onClick={(e) => {
						if (e.target === outsideRef.current) setShowModalP(false);
					}}
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
					}}
				>
					<FindPasswordModal onClose={setShowModalP} />
				</div>
			)}
		</div>
	);
}

export default Home;
