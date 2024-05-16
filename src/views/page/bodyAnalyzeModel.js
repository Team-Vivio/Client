import Coin1 from "../../img/bodyAnalyze/Coin.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";
import axios from "axios";
import { Component } from "react";

class BodyAnalyzeModel {
    constructor() {
        this.gender = null; //1, 2
        this.bodyType = null; //1, 2, 3
        this.height = 0; //키
        this.weight = 0; //몸무게
        this.resultList = null;
        this.name = "이름";
        this.historyList = null;
        this.uploadedImg = null;
        this.formData = new FormData();
        this.color = null;
        this.token = null;
    }
    setToken(token) {
        if (token === null || token === undefined) {
            console.log("토큰 없슴당");
            // token =
            //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        } else console.log("토큰 있습니당");
        this.token = token;
    }
    setGender(value) {
        this.gender = value;
        console.log("Gender Changed: " + this.gender);
    }
    setBodyType(value) {
        this.bodyType = value;
        console.log("BodyType Changed: " + this.bodyType);
    }
    setHeight(value) {
        this.height = Number(value);
        console.log("Height setted: " + this.height);
    }
    setWeight(value) {
        this.weight = Number(value);
        console.log("Weight setted: " + this.weight);
    }
    getAllResultList() {
        return this.resultList === null ? null : this.resultList;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAllHistoryList() {
        if (this.historyList === null) {
            let list = [];
            for (let i = 0; i < 7; i++) {
                list.push({ image: "", type: "" });
            }
            return list;
        } else {
            let list = this.historyList.data.result.viewListResultDTOS;
            if (list.length < 7)
                for (let i = list.length; i < 7; i++) {
                    list.push({ image: "", type: "" });
                }
            else list = list.slice(0, 7);
            return list;
        }
    }
    setUploadedImg(value) {
        this.uploadedImg = value;
    }
    setColor(value) {
        this.color = value;
        console.log("Color: " + value);
    }
    dataCheck() {
        console.log(
            this.gender +
                "-" +
                this.bodyType +
                "-" +
                this.height +
                "-" +
                this.weight +
                "-" +
                this.color
        );
        if (
            this.gender !== null &&
            this.bodyType !== null &&
            this.height &&
            this.weight
        ) {
            return true;
        } else {
            return false;
        }
    }
    setFormData(img) {
        this.formData.append("image", img);
    }
    //패션 추천받고 저장하기
    postFashion = async () => {
        this.resultList = null; //초기화
        if (this.uploadedImg === null) {
            //이미지 없다는 뜻
            this.formData.append("image", new File([""], "filename"));
        }
        const value = {
            gender: this.gender,
            height: this.height,
            weight: this.weight,
            type: this.bodyType,
            color: this.color,
        };
        this.formData.append("request", JSON.stringify(value));
        try {
            const result = await axios({
                method: "POST",
                url: `https://backend.vivi-o.site/fashions/`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
                data: this.formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
            });
            result.data.result.fashionTopDTOS.forEach((element) => {
                element.title = "상의";
            });
            result.data.result.fashionBottomDTOS.forEach((element) => {
                element.title = "하의";
            });
            this.resultList = result.data.result.fashionTopDTOS.concat(
                ...result.data.result.fashionBottomDTOS
            );
            console.log(this.resultList);
            //저장
            const save = {
                gender: this.gender,
                height: this.height,
                weight: this.weight,
                type: this.bodyType,
                fashionTops: result.data.result.fashionTopDTOS,
                fashionBottoms: result.data.result.fashionBottomDTOS,
            };
            console.log(save);
            try {
                const saveResult = await axios({
                    method: "POST",
                    url: `https://backend.vivi-o.site/fashions/fashionRecommand`,
                    mode: "cors",
                    headers: {
                        Authorization: `${this.token}`,
                    },
                    data: save, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
                });
                console.log(saveResult);
            } catch (error) {
                console.log(error);
            }
            this.getHistory(); //저장하고 기록 다시 가져오기
        } catch (error) {
            console.log(error);
        }
    };
    //추천 받았던 패션정보 불러오기
    getFashion = async (fashionID) => {
        this.resultList = null;
        try {
            const result = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/fashions/fashionRecommand/${fashionID}`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            result.data.result.fashionTops.forEach((element) => {
                element.title = "상의";
            });
            result.data.result.fashionBottoms.forEach((element) => {
                element.title = "하의";
            });
            this.resultList = result.data.result.fashionTops.concat(
                ...result.data.result.fashionBottoms
            );
        } catch (error) {
            console.log(error);
        }
    };
    //히스토리 가져오기
    getHistory = async () => {
        try {
            this.historyList = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/fashions/fashionRecommand`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            console.log(this.historyList);
        } catch (error) {
            console.log(error);
        }
    };
}
export default BodyAnalyzeModel;
