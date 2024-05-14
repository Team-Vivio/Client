import React, { useRef, useState } from "react";
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
	const outsideRef = useRef();
	// eslint-disable-next-line no-unused-vars
	const [_, setCookie] = useCookies(["token"]);

	// 이메일 찾기 모달 핸들러
	const showEmailModalHandler = () => {
		setShowModalE(true);
	};

	// 비밀번호 찾기 모달 핸들러
	const showPasswordModalHandler = () => {
		setShowModalP(true);
	};

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
				.post("/users/signin", {
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.data.isSuccess) {
						setCookie("token", res.data.result.token);
						alert("로그인 성공");
					} else {
						alert("로그인이 실패. 이메일과 비밀번호를 확인해주세요");
					}
				});
		} else {
			alert("이메일 또는 비밀번호를 입력해주세요");
		}
	}

	return (
		<div
			styles={{ width: window.screen.width, height: window.screen.height }}
			className={styles.page}
		>
			<div className={styles.logo}>
				<img src={mainLogo} alt="logo" />
			</div>
			<div className={styles.titleWrap}>
				생생한 패션 생활, ViVio에서 시작하세요
			</div>
			<div className={styles.margin1}>
				<button className={styles.btnGoogle}>
					<img src={google} alt="googleLogo" />
					구글로 시작하기
				</button>
			</div>
			<div className={styles.margin2}>
				<button className={styles.btnKakao}>
					<img src={kakao} alt="kakaoLogo" />
					카카오로 시작하기
				</button>
			</div>
			<HorizonLine text="OR" />
			<div className={styles.inputWrap}>
				<div className={styles.inputTitle}>
					<div>이메일</div>
					<input
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
			{showModalE && (
				<div
					ref={outsideRef}
					onClick={(e) => {
						if (e.target === outsideRef.current) setShowModalE(false);
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
				>
					<FindPasswordModal onClose={setShowModalP} />
				</div>
			)}
		</div>
	);
}

export default Home;
