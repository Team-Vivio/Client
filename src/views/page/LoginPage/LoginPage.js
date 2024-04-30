//import React, { useEffect, useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import HorizonLine from './HorizontalLine'
import styles from "../../../styles/LoginPage.module.css"
import mainLogo from '../../../img/VivioLogo.png'
import google from '../../../img/google.png'
import kakao from '../../../img/kakao.png'

function Home() {
    function handleSignupClick(){
        window.location.href="/Signup";
    }
    return (
        <div styles={{width: window.screen.width, height: window.screen.height}} className={styles.page}>
            <div className={styles.logo}>
                <img src={mainLogo} alt='logo'/>
            </div>
            <div className={styles.titleWrap}>
                생생한 패션 생활, ViVio에서 시작하세요
            </div>
            <div className={styles.margin1}>
                <button className={styles.btnGoogle}>
                    <img src={google} alt='googleLogo'/>
                    구글로 시작하기
                </button>
            </div>
            <div className={styles.margin2}>
                <button className={styles.btnKakao}>
                    <img src={kakao} alt='kakaoLogo'/>
                    카카오로 시작하기
                </button>
            </div>
            <HorizonLine text="OR" />
            <div className={styles.inputWrap}>
                <div className={styles.inputTitle}>
                    <div>이메일</div>
                    <input className={styles.textEP1} placeholder='abcd@email.com'/>
                </div>
            </ div>
            <div className={styles.inputWrap}>
                <div className={styles.inputTitle}>
                    비밀번호
                    <input type='password' className={styles.textEP2} placeholder='비밀번호를 입력해주세요'/>
                </div>
            </div>
            <div>
                <button className={styles.btnLogin}>
                    로그인
                </button>
            </div>
            <div className={styles.bottomText1}>
                이메일 혹은 비밀번호를 잊으셨나요?
                <div className={styles.bottomfont}>이메일 찾기</div>
                <div className={styles.bottomfont}>비밀번호 찾기</div>
            </div>
            <div className={styles.bottomText2}>
                아직 회원이 아니신가요?
                <div onClick={handleSignupClick} className={styles.bottomfont}>회원가입</div>
            </div>
        </div>
    )
}

export default Home
