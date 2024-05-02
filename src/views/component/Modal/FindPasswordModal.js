import React from "react";
import modalStyles from "../../../styles/Modal.module.css";

function FindPasswordModal() {
	return (
		<div className={modalStyles.passwordModal}>
			<div>비밀번호 찾기</div>
			<div>이메일</div>
		</div>
	);
}

export default FindPasswordModal;
