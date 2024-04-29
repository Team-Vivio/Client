import Coin1 from "../../img/bodyAnalyze/Coin.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";
import axios from "axios";
import { Component } from "react";

class BodyAnalyzeModel extends Component {
    constructor(props) {
        super(props);
        this.gender = null; //1, 2
        this.bodyType = null; //1, 2, 3
        this.height = 0; //키
        this.weight = 0; //몸무게
        this.resultList = null;
        this.name = "이름";
        this.historyList = [
            { id: 1, img: Coin1, info: "설명임" },
            { id: 2, img: Body1, info: "설명2" },
            { id: 3, img: "", info: "" },
            { id: 4, img: "", info: "" },
            { id: 5, img: "", info: "" },
            { id: 6, img: "", info: "" },
            { id: 7, img: "", info: "" },
        ];
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
        return this.historyList;
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
        } catch (error) {
            console.log(error);
        }
    };
}
export default BodyAnalyzeModel;
