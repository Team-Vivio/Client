import React, { useState } from "react";
import modalStyles from "../../../styles/Modal.module.css";
import Xbtn from "../../../img/modalXbtn.png";
import axios from "axios";

function FindPasswordModal(props) {
	const [email, setEmail] = useState("");
	const [isFindPassword, setIsFindPasssword] = useState(true);

	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

	//이메일 형식 체크
	const emailCheck = (email) => {
		return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
	};

	//확인 버튼
	function onCheckBtn() {
		setIsFindPasssword(false);
		if (emailCheck(email)) {
			axios
				.post("https://backend.vivi-o.site/users/sendTempPassword", {
					email: email,
				})
				.then((res) => {
					if (res.data.isSuccess) {
						setIsFindPasssword(true);
						alert("이메일로 임시 비밀번호를 보내드렸어요");
					} else {
						if (res.data.code === "EMAIL4001") {
							alert("계정이 존재하지 않습니다");
						} else {
							alert("소셜 로그인 계정입니다");
						}
					}
				})
				.catch((error) => {
					console.log("error called");
					console.log(error);
				});
		} else {
			setIsFindPasssword(true);
			alert("올바른 이메일을 입력해주세요");
		}
	}

	return (
		<div className={modalStyles.passwordModal}>
			<div>
				<button
					className={modalStyles.modalXBtn}
					onClick={() => props.onClose(false)}
				>
					<img src={Xbtn} alt="xbtn" />
				</button>
			</div>
			<div className={modalStyles.header}>비밀번호 찾기</div>
			{isFindPassword && (
				<>
					<div className={modalStyles.passwordDiv}>
						이메일
						<input
							className={modalStyles.passwordInput}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="abce@email.com"
						/>
					</div>
					<div className={modalStyles.PasswordWarning}>
						임시 비밀번호를 이메일로 보내드리는데 약 5초 정도 소요됩니다
					</div>
					<div className={modalStyles.PasswordWarning}>잠시만 기다려주세요</div>
					<button onClick={onCheckBtn} className={modalStyles.passwordBtn}>
						확인
					</button>
				</>
			)}
			{!isFindPassword && <div className={modalStyles.Spinner}></div>}
		</div>
	);
}

export default FindPasswordModal;
