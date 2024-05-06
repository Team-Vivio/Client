import React, { useEffect, useState } from "react";
import mainLogo from "../../../img/VivioLogo.png";
import styles from "../../../styles/Signup.module.css";

import axios from "axios";

function Signup() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [gender, setGender] = useState(0);
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
	const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
	const [password, setPassword] = useState("");
	const [passwordChk, setPasswordChk] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [emailCodeResponse, setEmailCodeResponse] = useState("");

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

	//이메일 인증번호 발급과 인증번호 저장 && "인증"버튼
	function onEmailCheck() {
		axios
			.post("/users/emailcheck", {
				email: email,
			})
			.then((res) => {
				if (res.data.result.message === "true") {
					if (emailCheck(email)) {
						alert("이메일로 인증번호를 보내드렸어요");
						// api 호출
						axios
							.post("/users/sendEmail", {
								email: email,
							})
							.then((res) => {
								if (res.data.isSuccess) {
									setEmailCodeResponse(res.data.result.message);
								}
							});
					} else {
						alert("올바른 이메일을 입력해주세요");
					}
				} else {
					alert("중복된 이메일입니다");
				}
			});
	}

	//이메일 인증 확인 버튼 눌렀을 시
	function onEmailCodeBtnCheck(e) {
		setCode(e.target.value);
		if (code === emailCodeResponse) {
			setIsEmailValid(true);
			alert("이메일 인증이 완료되었습니다");
		} else {
			alert("인증번호를 다시 확인해주세요");
		}
	}

	//이메일 체크
	const emailCheck = (email) => {
		return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
	};

	//회원정보 입력값 체크
	function onSubmitCheck() {
		if (gender === 0) {
			alert("성별을 선택하세요");
		} else {
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
					if (password.match(passwordRegEx) === null) {
						//형식에 맞지 않을 경우 아래 콘솔 출력
						alert("비밀번호 형식을 확인해주세요");
					} else {
						if (password !== passwordChk) {
							alert("비밀번호가 다릅니다");
						} else {
							if (isEmailValid) {
								onSubmit();
							} else {
								alert("이메일 인증을 해주세요");
							}
						}
					}
				}
			}
		}
	}

	//개인 정보 제출
	function onSubmit() {
		let date = new Date(`${year}-${month}-${day}`);
		axios
			.post("/users/signup", {
				name: name,
				gender: gender,
				email: email,
				password: password,
				phoneNumber: phone,
				birthDate: date,
				coin: 100,
				platform: 1,
			})
			.then((res) => {
				if (res.data.isSuccess) {
					alert("회원가입이 성공적으로 완료되었습니다");
				} else {
					alert("오류가 발생하여 나중에 다시 시도해주세요");
				}
			});
	}

	return (
		<div
			styles={{ width: window.screen.width, height: window.screen.height }}
			className={styles.page}
		>
			<div>
				<img src={mainLogo} alt="logo" />
			</div>
			<div className={styles.title}>생생한 패션 생활, ViVio에서 시작하세요</div>
			<div className={styles.box}>
				<div className={styles.inputTitle1}>
					이름
					<input
						onChange={(e) => {
							onChangeName(e);
						}}
						className={styles.input1}
						placeholder="아무개"
					/>
				</div>
				<div className={styles.inputTitle2}>
					전화번호
					<input
						type="text"
						name="numberValue"
						maxLength={13}
						value={numberValue || ""}
						onChange={handleNumber}
						className={styles.input2}
						placeholder="010-XXXX-XXXX"
					/>
				</div>
				<div className={styles.inputTitle3}>
					생년월일
					<input
						type="text"
						className={styles.input3_1}
						maxLength={4}
						pattern="\d*"
						placeholder="YYYY"
						onChange={(e) => {
							onChangeYear(e);
						}}
					/>
					<input
						type="text"
						className={styles.input3_2}
						maxLength={2}
						pattern="\d*"
						placeholder="MM"
						onChange={(e) => {
							onChangeMonth(e);
						}}
					/>
					<input
						type="text"
						className={styles.input3_2}
						maxLength={2}
						pattern="\d*"
						placeholder="DD"
						onChange={(e) => {
							onChangeDay(e);
						}}
					/>
				</div>
				<div className={styles.inputTitle4}>
					성별
					<div
						className={styles.input4_1}
						onClick={() => {
							setGender(1);
						}}
						style={
							gender === 1
								? {
										backgroundColor: "#FFD439",
										color: "black",
										boxShadow:
											"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
								  }
								: { color: "#BBBBBB", border: "1px solid #C2C2C2" }
						}
					>
						남성
					</div>
					<div
						className={styles.input4_2}
						onClick={() => {
							setGender(2);
						}}
						style={
							gender === 2
								? {
										backgroundColor: "#FFD439",
										color: "black",
										boxShadow:
											"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
								  }
								: { color: "#BBBBBB", border: "1px solid #C2C2C2" }
						}
					>
						여성
					</div>
				</div>
				<div className={styles.inputTitle5}>
					이메일
					<input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						className={styles.input5}
						placeholder="abce@email.com"
					/>
					<button className={styles.smallBtn1} onClick={onEmailCheck}>
						인증
					</button>
				</div>
				<div className={styles.inputTitle6}>
					인증번호
					<input
						onChange={(e) => {
							setCode(e.target.value);
						}}
						className={styles.input6}
						placeholder="이메일 인증번호를 입력해주세요"
					/>
					<button className={styles.smallBtn2} onClick={onEmailCodeBtnCheck}>
						확인
					</button>
				</div>
				<div className={styles.inputTitle7}>
					비밀번호
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						className={styles.input7}
						placeholder="비밀번호를 입력해주세요"
					/>
				</div>
				<div className={styles.pwdText}>
					*5-13자 사이로 입력　*영문, 숫자 혼합 필수
				</div>
				<div className={styles.inputTitle8}>
					비밀번호 확인
					<input
						onChange={(e) => {
							setPasswordChk(e.target.value);
						}}
						type="password"
						className={styles.input8}
						placeholder="비밀번호를 다시 한번 입력해주세요"
					/>
				</div>
				<button className={styles.signBtn} onClick={onSubmitCheck}>
					회원가입
				</button>
			</div>
		</div>
	);
}

export default Signup;
