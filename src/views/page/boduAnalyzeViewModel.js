import { useState } from "react";

import Gender1 from "../../img/bodyAnalyze/Gender0.png";
import Gender2 from "../../img/bodyAnalyze/Gender2.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";
import Body2 from "../../img/bodyAnalyze/Body2.png";
import Body3 from "../../img/bodyAnalyze/Body3.png";

class BodyAnalyzeViewModel {
    constructor(model) {
        this.model = model;
        this.textList = [
            {
                left: "41px",
                top: "121px",
                size: "35px",
                text: "나만의 패션 찾기",
            },
            {
                left: "96px",
                top: "260px",
                size: "28px",
                text: "Q1. 성별을 선택해주세요",
            },
            {
                left: "96px",
                top: "447px",
                size: "28px",
                text: "Q2. 키를 입력해주세요",
            },
            {
                left: "330px",
                top: "512px",
                size: "30px",
                text: "CM",
            },
            {
                left: "96px",
                top: "593px",
                size: "28px",
                text: "Q3. 몸무게를 입력해주세요",
            },
            {
                left: "330px",
                top: "662px",
                size: "30px",
                text: "Kg",
            },
            {
                left: "534px",
                top: "260px",
                size: "28px",
                text: "Q4. 체형을 선택해주세요",
            },
            {
                left: "534px",
                top: "418px",
                size: "28px",
                text: "Q5. 좋아하는 컬러가 있으시면\n선택해주세요(선택)",
            },
            {
                left: "534px",
                top: "555px",
                size: "28px",
                text: "Q6. 정확도를 위해\n\t전신 사진을 올려주세요(선택)",
            },
        ];
        this.GenderBtns = [
            {
                left: "134px",
                top: "322px",
                img: Gender1,
                size: "45px",
                id: 1,
                active: 0, //0이면 누르기전 1이면 활성화(Up) -1이면 비활성화(Down)
            },
            {
                left: "304px",
                top: "322px",
                img: Gender2,
                size: "45px",
                id: 2,
                active: 0,
            },
        ];
        this.BodyTypeBtns = [
            {
                left: "580px",
                top: "322px",
                img: Body1,
                size: "25px",
                id: 1,
                active: 0,
            },
            {
                left: "698px",
                top: "322px",
                img: Body2,
                size: "25px",
                id: 2,
                active: 0,
            },
            {
                left: "816px",
                top: "322px",
                img: Body3,
                size: "30px",
                id: 3,
                active: 0,
            },
        ];
        this.modalActive = false;
        this.modalIndex = -1;
        this.loadingText = [
            "패션 잡지 보는중...",
            "지식인에 물어보는 중...",
            "동대문 시장 뛰어다니는중...",
            "부평지하상가 돌아다니는 중...",
        ];
    }
    getLoadingTextLength() {
        return this.loadingText.length;
    }
    getLoadingText(index) {
        return this.loadingText[index];
    }
    getName() {
        return this.model.getName();
    }
    setToken(token) {
        this.model.setToken(token);
    }
    setGender(value) {
        this.model.setGender(value);
        this.GenderBtns.forEach((element) => {
            if (element.id === value) {
                console.log(element.id + "Actived");
                element.active = 1;
            } else {
                console.log(element.id + "Disactived");
                element.active = -1;
            }
        });
    }
    setBodyType(value) {
        this.model.setBodyType(value);
        this.BodyTypeBtns.forEach((element) => {
            if (element.id === value) {
                console.log(element.id + "Actived");
                element.active = 1;
            } else {
                console.log(element.id + "Disactived");
                element.active = -1;
            }
        });
    }
    getAllResultList() {
        return this.model.getAllResultList();
    }
    getModalList() {
        return this.modalList;
    }
    handleInputValue(event) {
        if (event.target.value.length > 3) {
            //3글자가 넘어가면
            if (event.target.value.indexOf(".") !== -1) {
                //소수점이 있다면 5자리 컷
                event.target.value = event.target.value.substr(
                    0,
                    event.target.value.length > 5
                        ? 5
                        : event.target.value.length
                );
            } else {
                //소수점 없으면 3자리 컷
                event.target.value = event.target.value.substr(0, 3);
            }
        }
    }
    handleInputBlur(event, min, max) {
        if (event.target.value < min) {
            alert(min + "이하의 값을 입력해 주세요");
            event.target.value = min;
        }
        if (event.target.value > max) {
            alert(max + "이상의 값을 입력해 주세요");
            event.target.value = max;
        }
        if (event.target.value.indexOf(".") !== -1) {
            //소수점이 있다면 반올림
            event.target.value = Math.round(event.target.value);
        }
        event.target.value = event.target.value.substr(0, 3);
    }
    setHeight(value) {
        this.model.setHeight(value);
    }
    setWeight(value) {
        this.model.setWeight(value);
    }
    getAllHistoryList() {
        return this.model.getAllHistoryList();
    }
    setUploadedImg(file) {
        this.model.setUploadedImg(file);
    }
    dataCheck() {
        return this.model.dataCheck();
    }
    getModalActive() {
        return this.modalActive;
    }
    setModalActive(value) {
        this.modalActive = value;
    }
    getModalIndex() {
        return this.modalIndex;
    }
    setModalIndex(value) {
        this.modalIndex = value;
    }
    setFormData(img) {
        this.model.setFormData(img);
    }
    setColor(value) {
        this.model.setColor(value);
    }
    postFashion = async () => {
        await this.model.postFashion();
    };
    getHistory = async () => {
        await this.model.getHistory();
    };
    getFashion = async (fashionID) => {
        await this.model.getFashion(fashionID);
    };
}

export default BodyAnalyzeViewModel;
