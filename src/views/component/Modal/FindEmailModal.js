import React from "react";
import modalStyles from "../../../styles/Modal.module.css";

function FindEmailModal() {
	return (
		<div className={modalStyles.emailModal}>
			<div>이메일 찾기</div>
			<div>이름</div>
			<div>생년월일</div>
			<div>전화번호</div>
			<button>확인</button>
		</div>
	);
}

export default FindEmailModal;
