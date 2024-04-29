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
        this.state = "main"; //main, loading, result
        this.formData = new FormData();
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
        return this.resultList === null ? null : this.resultList.data.result;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAllHistoryList() {
        if (this.historyList === null) {
            console.log("return null");
            return null;
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
    setState(value) {
        this.state = value;
    }
    getState() {
        return this.state;
    }
    dataCheck() {
        console.log(
            this.gender +
                "-" +
                this.bodyType +
                "-" +
                this.height +
                "-" +
                this.weight
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
        };
        this.formData.append("request", JSON.stringify(value));
        try {
            this.resultList = await axios({
                method: "POST",
                url: `/fashions/`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
                data: this.formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
            });
            console.log(this.resultList);
            //저장
            const accessToken =
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDM2MDk4NSwiZXhwIjoxNzE0MzgyNTg1LCJpZCI6MiwiZW1haWwiOiJqeTU4NDlAbmF2ZXIuY29tIn0.VQYHm-GvZx1OP8zWCNzQ82gu_znavUvmWXdV4ECHlgc";
            const save = {
                gender: this.gender,
                height: this.height,
                weight: this.weight,
                type: this.bodyType,
                fashionTops: this.resultList.data.result.fashionTopDTOS,
                fashionBottoms: this.resultList.data.result.fashionBottomDTOS,
            };
            console.log(save);
            try {
                const saveResult = await axios({
                    method: "POST",
                    url: `/fashions/fashionRecommand`,
                    mode: "cors",
                    headers: {
                        Authorization: `${accessToken}`,
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
    getHistory = async () => {
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDM2MDk4NSwiZXhwIjoxNzE0MzgyNTg1LCJpZCI6MiwiZW1haWwiOiJqeTU4NDlAbmF2ZXIuY29tIn0.VQYHm-GvZx1OP8zWCNzQ82gu_znavUvmWXdV4ECHlgc";
        try {
            this.historyList = await axios({
                method: "GET",
                url: `/fashions/fashionRecommand`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            console.log(this.historyList);
        } catch (error) {
            console.log(error);
        }
    };
}
export default BodyAnalyzeModel;
