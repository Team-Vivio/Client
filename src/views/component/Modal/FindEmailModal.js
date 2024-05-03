import React from "react";
import modalStyles from "../../../styles/Modal.module.css";

function FindEmailModal(props) {
	return (
		<div className={modalStyles.emailModal}>
			<div>
				이메일 찾기
				<button onClick={() => props.onClose(false)}>X</button>
			</div>
			<div>
				이름<input></input>
			</div>
			<div>
				생년월일<input></input>
			</div>
			<div>
				전화번호<input></input>
			</div>
			<button>확인</button>
		</div>
	);
}

export default FindEmailModal;
