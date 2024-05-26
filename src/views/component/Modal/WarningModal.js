import React from "react";
import modalStyles from "../../../styles/Modal.module.css";
import Loginlock from "../../../img/CoordiFinder/lock.png";
import Xbtn from "../../../img/modalXbtn.png";

function WarningModal(props) {
	// 모달의 로그인 버튼 클릭 시, 로그인 창으로 이동
	function handleLoginBtn() {
		window.location.href = "/Login";
	}
	function handleXBtn() {
		window.location.href = "/";
	}
	return (
		<div className={modalStyles.WarningModal}>
			<div>
				<img
					className={modalStyles.LockmodalXBtn}
					onClick={handleXBtn}
					src={Xbtn}
					alt="Xbutton"
				/>
			</div>
			<div>
				<img className={modalStyles.LockImg} src={Loginlock} alt="LoginLock" />
			</div>
			<div className={modalStyles.LockMessage}>로그인 시 이용할 수 있어요!</div>
			<div>
				<button className={modalStyles.LockBtn} onClick={handleLoginBtn}>
					로그인 하러 가기
				</button>
			</div>
		</div>
	);
}

export default WarningModal;
