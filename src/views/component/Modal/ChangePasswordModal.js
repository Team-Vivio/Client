import React, { useState } from "react";
import modalStyles from "../../../styles/Modal.module.css";
import Xbtn from "../../../img/modalXbtn.png";
import axios from "axios";
import { useCookies } from "react-cookie";

function ChangePasswordModal(props) {
	const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
	const [curPassword, setCurPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [cookies] = useCookies(["token"]);
	const token = cookies.token;

	// 현재 비밀번호 값
	function onChangeCurPassword(e) {
		setCurPassword(e.target.value);
	}

	//새로운 비밀번호 값
	function onChangeNewPassword(e) {
		setNewPassword(e.target.value);
	}

	// 확인 버튼을 누르고 새로운 비밀번호가 형식에 맞는지 확인
	function checkBeforeBtn() {
		if (newPassword.match(passwordRegEx) === null) {
			// 형식에 맞지 않을 경우 아래 콘솔 출력
			alert("비밀번호 형식을 확인해주세요");
		} else {
			onSubmit();
		}
	}

	// 새로운 비밀번호가 형식에 맞고 새로운 비밀번호를 제출
	function onSubmit() {
		axios
			.post(
				"https://backend.vivi-o.site/users/changePassword",
				{
					originalPassword: curPassword,
					password: newPassword,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((res) => {
				if (res.data.isSuccess) {
					alert("비밀번호 변경이 완료되었습니다");
					props.onClose(false);
				} else {
					alert("현재 비밀번호가 일치하지 않습니다");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className={modalStyles.ChangePasswordModal}>
			<div>
				<button
					className={modalStyles.modalXBtn}
					onClick={() => props.onClose(false)}
				>
					<img src={Xbtn} alt="xbtn" />
				</button>
			</div>
			<div className={modalStyles.changePasswordheader}>비밀번호 변경</div>
			<div className={modalStyles.curPasswordDiv}>
				현재 비밀번호
				<input
					className={modalStyles.curPasswordInput}
					type="password"
					onChange={(e) => {
						onChangeCurPassword(e);
					}}
				></input>
			</div>
			<div className={modalStyles.newPasswordDiv}>
				새로운 비밀번호
				<input
					className={modalStyles.newPasswordInput}
					type="password"
					onChange={(e) => {
						onChangeNewPassword(e);
					}}
				></input>
			</div>
			<div className={modalStyles.newPasswordWarning}>
				*8-20자 사이로 입력　*영문, 숫자 혼합 필수
			</div>
			<button onClick={checkBeforeBtn} className={modalStyles.checkBtn}>
				확인
			</button>
		</div>
	);
}

export default ChangePasswordModal;
