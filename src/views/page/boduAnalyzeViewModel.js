import { useState } from "react";

import Gender1 from "../../img/bodyAnalyze/Gender1.png";
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
                top: "447px",
                size: "28px",
                text: "Q5. 정확도를 위해\n\t전신 사진을 올려주세요(선택)",
            },
        ];
        this.GenderBtns = [
            {
                left: "134px",
                top: "322px",
                img: Gender1,
                size: "45px",
                id: "male",
                active: false,
            },
            {
                left: "304px",
                top: "322px",
                img: Gender2,
                size: "45px",
                id: "female",
                active: false,
            },
        ];
        this.BodyTypeBtns = [
            {
                left: "580px",
                top: "322px",
                img: Body1,
                size: "25px",
                id: 1,
                active: false,
            },
            {
                left: "698px",
                top: "322px",
                img: Body2,
                size: "25px",
                id: 2,
                active: false,
            },
            {
                left: "816px",
                top: "322px",
                img: Body3,
                size: "30px",
                id: 3,
                active: false,
            },
        ];
    }
    setGender(value) {
        this.model.setGender(value);
        this.GenderBtns.forEach((element) => {
            if (element.id === value) {
                console.log(element.id + "Actived");
                element.active = true;
            } else {
                console.log(element.id + "Disactived");
                element.active = false;
            }
        });
    }
    setBodyType(value) {
        this.model.setBodyType(value);
        this.BodyTypeBtns.forEach((element) => {
            if (element.id === value) {
                console.log(element.id + "Actived");
                element.active = true;
            } else {
                console.log(element.id + "Disactived");
                element.active = false;
            }
        });
    }
    getAllResultList() {
        return this.model.getAllResultList();
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
    handleInputBlur(event) {
        if (event.target.value.indexOf(".") !== -1) {
            //소수점이 있다면 반올림
            event.target.value = Math.round(event.target.value);
        }
        event.target.value = event.target.value.substr(0, 3);
    }
    setHeight(value) {
        this.model.setHeight(value);
    }
    getAllHistoryList() {
        return this.model.getAllHistoryList();
    }
    setUploadedImg(file) {
        this.model.setUploadedImg(file);
    }
    setState(value) {
        this.model.setState(value);
    }
    getState() {
        return this.model.getState();
    }
}

export default BodyAnalyzeViewModel;
