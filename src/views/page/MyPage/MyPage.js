import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Mypage.module.css";
import background from "../../../img/background.png";
import mainLogo from "../../../img/whiteLogo.png";
import imageDragDrop from "../../../img/ImageDrag&Drop.png";
import imageXBtn from "../../../img/clothXBtn.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import ChangePasswordModal from "../../component/Modal/ChangePasswordModal";
import WarningModal from "../../component/Modal/WarningModal";

function MyPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const formattedPhoneNumber = formatPhoneNumber(phone);
	const [showModalP, setShowModalP] = useState(false);
	const outsideRef = useRef();
	const [cookies] = useCookies(["token", "socialToken"]);
	const token = cookies.token;
	const [blur, setBlur] = useState(false);
	const [isFindSocialToken, setIsFindSocialToken] = useState(false);
	const [showModalW, setShowModalW] = useState(false);

	// 모달 띄우고, 배경 블러
	useEffect(() => {
		if (showModalP === false) {
			setBlur(false);
		} else setBlur(true);
	}, [showModalP]);

	// 비로그인 시, 마이페이지를 접근하려는 시도 차단
	useEffect(() => {
		if (!cookies.token) {
			setShowModalW(true);
			setBlur(true);
		}
	});

	// 이미지
	const [top, setTop] = useState([]);
	const type1 = "outer";
	const [bottom, setBottom] = useState([]);
	const type2 = "top";
	const [outer, setOuter] = useState([]);
	const type3 = "bottom";

	// 비밀번호 변경 모달 핸들러
	const showPasswordChangeModalHandler = () => {
		setShowModalP(true);
		setBlur(true);
	};

	// 아우터 이미지 불러오기
	function OuterImg() {
		return outer.map((OuterImg, idx) => (
			<div className={styles.ClothDiv} key={idx}>
				<img className={styles.ClothImage} alt="outer" src={OuterImg.image} />
				<img
					className={styles.Deletebtn}
					alt="Xbtn"
					src={imageXBtn}
					onClick={() => {
						handleDeleteOuterImage(OuterImg.id);
					}}
				/>
			</div>
		));
	}

	// 아우터 이미지 삭제하기
	const handleDeleteOuterImage = (id) => {
		axios.delete(`https://backend.vivi-o.site/users/closet/${type1}/${id}`, {
			headers: {
				Authorization: token,
			},
			data: {},
		});
		window.location.reload();
	};

	// 상의 이미지 불러오기
	function TopImg() {
		return top.map((TopImg, idx) => (
			<div className={styles.ClothDiv} key={idx}>
				<img className={styles.ClothImage} alt="top" src={TopImg.image} />
				<img
					className={styles.Deletebtn}
					alt="Xbtn"
					src={imageXBtn}
					onClick={() => {
						handleDeleteTopImage(TopImg.id);
					}}
				/>
			</div>
		));
	}

	// 상의 이미지 삭제하기
	const handleDeleteTopImage = (id) => {
		axios.delete(`https://backend.vivi-o.site/users/closet/${type2}/${id}`, {
			headers: {
				Authorization: token,
			},
			data: {},
		});
		window.location.reload();
	};

	// 하의 이미지 불러오기
	function BottomImg() {
		return bottom.map((BottomImg, idx) => (
			<div className={styles.ClothDiv} key={idx}>
				<img className={styles.ClothImage} alt="bottom" src={BottomImg.image} />
				<img
					className={styles.Deletebtn}
					alt="Xbtn"
					src={imageXBtn}
					onClick={() => {
						handleDeleteBottomImage(BottomImg.id);
					}}
				/>
			</div>
		));
	}

	// 하의 이미지 삭제하기
	const handleDeleteBottomImage = (id) => {
		axios.delete(`https://backend.vivi-o.site/users/closet/${type3}/${id}`, {
			headers: {
				Authorization: token,
			},
			data: {},
		});
		window.location.reload();
	};

	// 마이페이지 불러올 때, 토큰 값 넘겨 정보 받아오기
	useEffect(() => {
		console.log(cookies.socialToken);
		if (!cookies.socialToken || cookies.socialToken === "undefined") {
			axios
				.get("https://backend.vivi-o.site/users/userInfo", {
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
		} else {
			setIsFindSocialToken(true);
		}
	}, [cookies.socialToken]);

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

	// 나만의 옷장 아우터 불러오기
	useEffect(() => {
		axios
			.get(`https://backend.vivi-o.site/users/closet/${type1}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res.data.result.images);
				if (res.data.isSuccess) {
					setOuter(res.data.result.images);
				} else {
					alert("등록된 옷이 없습니다");
				}
			});
	}, [token, type1]);

	// 나만의 옷장 상의 불러오기
	useEffect(() => {
		axios
			.get(`https://backend.vivi-o.site/users/closet/${type2}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res.data.result.images);
				if (res.data.isSuccess) {
					setTop(res.data.result.images);
				} else {
					alert("등록된 옷이 없습니다");
				}
			});
	}, [token, type2]);

	// 나만의 옷장 하의 불러오기
	useEffect(() => {
		axios
			.get(`https://backend.vivi-o.site/users/closet/${type3}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res.data.result.images);
				if (res.data.isSuccess) {
					setBottom(res.data.result.images);
				} else {
					alert("등록된 옷이 없습니다");
				}
			});
	}, [token, type3]);

	// 이미지 세팅
	const setImage = (file, type) => {
		handleUploadImage(file, type);
	};

	// 아우터, 상의, 하의 이미지 등록
	function handleUploadImage(data, type) {
		const temp = {
			type: type,
		};
		let formData = new FormData();
		formData.append("request", JSON.stringify(temp));
		formData.append("image", data);

		axios
			.post("https://backend.vivi-o.site/users/closet", formData, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.data.isSuccess) {
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// 이미지 드래그&드롭 이벤트 처리
	const handleDragOver = (event) => {
		event.preventDefault();
	};
	const handleDrop = (event, type) => {
		event.preventDefault();

		const file = event.dataTransfer.files[0];
		if (file.type.includes("image")) {
			setImage(file, type);
		}
	};
	const handleUpload = ({ target }, type) => {
		const file = target.files[0];
		if (file.type.includes("image")) {
			setImage(file, type);
		}
	};

	return (
		<div>
			<div
				className={`${styles.mainDiv} ${blur ? styles.blurpage : styles.page}`}
			>
				<img
					alt="backgroundimage"
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
							<div className={`${styles.scrollbar_X} ${styles.outerInnerDiv}`}>
								<label
									className={styles.DragAndDropLabel}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, "outer")}
								>
									<input
										type="file"
										className={styles.DragAndDropInput}
										onChange={(e) => handleUpload(e, "outer")}
									/>
									<img
										className={styles.DragAndDropImage}
										alt="OuterDragAndDrop"
										src={imageDragDrop}
									/>
								</label>
								<OuterImg />
							</div>
						</div>
						<hr className={styles.closetRowLine} />
						<div className={styles.topDiv}>
							<div className={styles.topTitle}>상의</div>
							<div className={`${styles.scrollbar_X} ${styles.topInnerDiv}`}>
								<label
									className={styles.DragAndDropLabel}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, "top")}
								>
									<input
										type="file"
										className={styles.DragAndDropInput}
										onChange={(e) => handleUpload(e, "top")}
									/>
									<img
										className={styles.DragAndDropImage}
										alt="TopDragAndDrop"
										src={imageDragDrop}
									/>
								</label>
								<TopImg />
							</div>
						</div>
						<hr className={styles.closetRowLine} />
						<div className={styles.bottomsDiv}>
							<div className={styles.bottomsTitle}>하의</div>
							<div
								className={`${styles.scrollbar_X} ${styles.bottomsInnerDiv}`}
							>
								<label
									className={styles.DragAndDropLabel}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, "bottom")}
								>
									<input
										type="file"
										className={styles.DragAndDropInput}
										onChange={(e) => handleUpload(e, "bottom")}
									/>
									<img
										className={styles.DragAndDropImage}
										alt="BottomDragAndDrop"
										src={imageDragDrop}
									/>
								</label>
								<BottomImg />
							</div>
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
						{!isFindSocialToken && (
							<>
								<div className={styles.nameDiv}>
									<div className={styles.nameTitle}>이름</div>
									<div className={styles.nameResult}>{name}</div>
								</div>
								<div className={styles.phoneDiv}>
									<div className={styles.phoneTitle}>전화번호</div>
									<div className={styles.phoneResult}>
										{formattedPhoneNumber}
									</div>
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
									<button
										onClick={showPasswordChangeModalHandler}
										className={styles.passwordChangeBtn}
									>
										변경
									</button>
								</div>
							</>
						)}
						{isFindSocialToken && (
							<div className={styles.socialLoginDiv}>
								소셜 로그인은 개인정보를 이용할 수 없습니다
							</div>
						)}
					</div>
				</div>
			</div>
			{showModalP && (
				<div
					ref={outsideRef}
					onClick={(e) => {
						if (e.target === outsideRef.current) setShowModalP(false);
					}}
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
					}}
				>
					<ChangePasswordModal onClose={setShowModalP} />
				</div>
			)}
			{showModalW && (
				<div
					ref={outsideRef}
					onClick={(e) => {
						if (e.target === outsideRef.current) setShowModalW(false);
					}}
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
					}}
				>
					<WarningModal onClose={setShowModalW} />
				</div>
			)}
		</div>
	);
}

export default MyPage;
