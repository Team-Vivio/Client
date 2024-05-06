import React, { useEffect, useState } from "react";
import modalStyles from "../../../styles/Modal.module.css";
import Xbtn from "../../../img/modalXbtn.png";
import axios from "axios";

function FindEmailModal(props) {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [email, setEmail] = useState("");
	const [isFindEmail, setIsFindEmail] = useState(true);

	//전화번호 자동 하이픈
	const [values, setValues] = useState({
		numberValue: "",
	});
	const { numberValue } = values;

	const handleNumber = (e) => {
		const { value, name } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};
	useEffect(() => {
		if (numberValue.type !== Number) {
			setValues({
				numberValue: numberValue.replace(/[^0-9]/g, ""),
			});
		}
		if (numberValue.length === 11) {
			setValues({
				numberValue: numberValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
			});
		} else if (numberValue.length === 13) {
			setValues({
				numberValue: numberValue
					//하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
					.replace(/-/g, "")
					.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
			});
		}
		setPhone(numberValue.replace(/-/g, ""));
	}, [numberValue]);

	//이름 값
	function onChangeName(e) {
		setName(e.target.value);
	}

	//연도 값
	function onChangeYear(e) {
		e.preventDefault();
		setYear(e.target.value);
	}
	//월 값
	function onChangeMonth(e) {
		e.preventDefault();
		setMonth(e.target.value);
	}
	//일 값
	function onChangeDay(e) {
		e.preventDefault();
		setDay(e.target.value);
	}

	//확인 버튼을 누르고 입력 값 확인
	function checkBeforeBtn() {
		if (
			!(year >= 1900 && year <= 2024) &&
			month <= 0 &&
			month >= 13 &&
			day <= 0 &&
			day >= 32
		) {
			alert("생년월일을 확인해주세요");
		} else {
			if (
				!(
					phone[0] === "0" &&
					phone[1] === "1" &&
					phone[2] === "0" &&
					phone.length === 11
				)
			) {
				alert("전화번호를 확인해주세요");
			} else {
				onSubmit();
			}
		}
	}

	//입력 값 확인 후 서버에 전송
	async function onSubmit() {
		let date = new Date(`${year}-${month}-${day}`);
		axios
			.post("/users/findEmail", {
				name: name,
				phoneNum: phone,
				birthDate: date,
			})
			.then(async (res) => {
				if (res.data.isSuccess) {
					if (res.data.result !== null) {
						setEmail(res.data.result.email);
						setIsFindEmail(false);
					} else {
						alert("입력 정보가 잘못되었거나 계정이 없습니다");
					}
				} else {
					alert("입력 정보가 잘못되었거나 계정이 없습니다");
				}
			});
	}

	return (
		<div className={modalStyles.emailModal}>
			<div>
				<button
					className={modalStyles.modalXBtn}
					onClick={() => props.onClose(false)}
				>
					<img src={Xbtn} alt="xbtn" />
				</button>
			</div>
			<div className={modalStyles.header}>이메일 찾기</div>
			{isFindEmail && (
				<>
					<div className={modalStyles.nameDiv}>
						이름
						<input
							onChange={(e) => {
								onChangeName(e);
							}}
							className={modalStyles.nameInput}
							placeholder="아무개"
						></input>
					</div>

					<div className={modalStyles.birthDiv}>
						생년월일
						<input
							type="text"
							maxLength={4}
							pattern="\d*"
							onChange={(e) => {
								onChangeYear(e);
							}}
							className={modalStyles.yearInput}
							placeholder="YYYY"
						></input>
						<input
							type="text"
							maxLength={2}
							pattern="\d*"
							onChange={(e) => {
								onChangeMonth(e);
							}}
							className={modalStyles.monthInput}
							placeholder="MM"
						></input>
						<input
							type="text"
							maxLength={2}
							pattern="\d*"
							onChange={(e) => {
								onChangeDay(e);
							}}
							className={modalStyles.dayInput}
							placeholder="DD"
						></input>
					</div>
					<div className={modalStyles.phoneDiv}>
						전화번호
						<input
							type="text"
							name="numberValue"
							maxLength={13}
							value={numberValue || ""}
							onChange={handleNumber}
							className={modalStyles.phoneInput}
							placeholder="010-XXXX-XXXX"
						></input>
					</div>
					<button onClick={checkBeforeBtn} className={modalStyles.checkBtn}>
						확인
					</button>
				</>
			)}
			{!isFindEmail && <div className={modalStyles.emailResult}>{email}</div>}
		</div>
	);
}

export default FindEmailModal;
