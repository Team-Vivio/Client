import React, { useState } from "react";
import modalStyles from "../../../styles/Modal.module.css";

function FindPasswordModal() {
	const [closeModal, setCloseModal] = useState(false);
	function onClickX(e) {
		setCloseModal(true);
		if (setCloseModal) {
		}
	}
	return (
		<div className={modalStyles.passwordModal}>
			<div>
				비밀번호 찾기<button onClick={onClickX}>X</button>
			</div>
			<div>
				이메일<input></input>
			</div>
			<button>확인</button>
		</div>
	);
}

export default FindPasswordModal;
