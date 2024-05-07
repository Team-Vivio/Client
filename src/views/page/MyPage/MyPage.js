import React, { useEffect, useState } from "react";
import styles from "../../../styles/Mypage.module.css";
import background from "../../../img/background.png";
import mainLogo from "../../../img/whiteLogo.png";
import axios from "axios";

function MyPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const formattedPhoneNumber = formatPhoneNumber(phone);
	let token =
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";

	// 마이페이지 불러올 때, 토큰 값 넘겨 정보 받아오기
	useEffect(() => {
		axios
			.get("/users/userInfo", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.data.isSuccess) {
					setName(res.data.result.name);
					setEmail(res.data.result.email);
					setPhone(res.data.result.phoneNumber);
					setBirthDate(res.data.result.birthDate);
					if (res.data.result.gender === "male") {
						setGender("남성");
					} else {
						setGender("여성");
					}
				}
			});
	});

	// 전화번호 받아 온 값에 자동으로 하이픈 넣기
	function formatPhoneNumber(phone) {
		// 전화번호에서 하이픈(-)을 제외한 숫자만 추출
		const cleaned = ("" + phone).replace(/\D/g, "");

		// 형식에 맞게 하이픈 추가
		const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
		if (match) {
			return [match[1], match[2], match[3]].join("-");
		}

		// 형식에 맞지 않는 경우 그대로 반환
		return phone;
	}

	return (
		<div className={styles.mainDiv}>
			<img
				alt=""
				src={background}
				style={{
					position: "fixed",
					width: window.innerWidth,
					height: window.innerHeight,
					objectFit: "cover",
					zIndex: -1,
				}}
			/>
			<div
				className={styles.scrollbar_Y}
				style={{
					width: 729,
					height: window.innerHeight - 178,
					paddingRight: 30,
					overflowX: "hidden",
					marginTop: 178,
					marginLeft: 85,
					marginRight: 70,
				}}
			>
				<div className={styles.closetDiv} style={{ height: "auto" }}>
					<div className={styles.closetMiddleTitle}>나만의 옷장</div>
					<hr className={styles.closetRowLine} />
					<div className={styles.outerDiv}>
						<div className={styles.outerTitle}>아우터</div>
						<div className={styles.scrollbar_X}>하기 존나 싫다zzzz</div>
					</div>
					<hr className={styles.closetRowLine} />
					<div className={styles.topDiv}>
						<div className={styles.topTitle}>상의</div>
						<div className={styles.scrollRow}></div>
					</div>
					<hr className={styles.closetRowLine} />
					<div className={styles.bottomsDiv}>
						<div className={styles.bottomsTitle}>하의</div>
						<div className={styles.scrollRow}></div>
					</div>
				</div>
			</div>
			<div className={styles.columnLine}></div>
			<div className={styles.informationDiv}>
				<img alt="" src={mainLogo} />
				<div className={styles.middleTitle}>
					생생한 패션 생활, ViViO에서 시작하세요
				</div>
				<div className={styles.infoDiv}>
					<div className={styles.nameDiv}>
						<div className={styles.nameTitle}>이름</div>
						<div className={styles.nameResult}>{name}</div>
					</div>
					<div className={styles.phoneDiv}>
						<div className={styles.phoneTitle}>전화번호</div>
						<div className={styles.phoneResult}>{formattedPhoneNumber}</div>
					</div>
					<div className={styles.birthDiv}>
						<div className={styles.birthTitle}>생년월일</div>
						<div className={styles.birthResult}>{birthDate}</div>
					</div>
					<div className={styles.genderDiv}>
						<div className={styles.genderTitle}>성별</div>
						<div className={styles.genderResult}>{gender}</div>
					</div>
					<div className={styles.emailDiv}>
						<div className={styles.emailTitle}>이메일</div>
						<div className={styles.emailResult}>{email}</div>
					</div>
					<div className={styles.passwordDiv}>
						<div className={styles.passwordTitle}>비밀번호</div>
						<button className={styles.passwordChangeBtn}>변경</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyPage;
