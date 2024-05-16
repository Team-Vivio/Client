import axios from "axios";

class ToneAnalyzeModel {
    constructor() {
        this.gender = null; //1, 2
        this.resultList = null;
        this.name = "이름";
        this.historyList = null;
        this.uploadedImg = null;

        this.state = "main"; //main, loading, result
        this.formData = new FormData(); // /colors/
        this.formData2 = new FormData(); // /colors/personalColor
    }
    setGender(value) {
        this.gender = value;
        // console.log("Gender Changed: " + this.gender);
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
            // console.log("No History");
            return null;
        } else {
            let list = this.historyList.data.result.viewListResultDTOS;
            // ex)
            // {
            //     "image": null,
            //     "session": "spring",
            //     "tone": "warm",
            //     "perColId": 1
            // },
            for (let history of list) {
                if (history.tone === "warm") history.tone = "웜톤";
                else if (history.tone === "cool") history.tone = "쿨톤";
            }

            if (list.length < 7)
                for (let i = list.length; i < 7; i++) {
                    list.push({ image: "", type: "" });
                }
            else list = list.slice(0, 7);
            return list;
            //근데 이러면 최초의 7개만 보여주는거 아닌감? 나중에 수정해야징
        }
    }
    getUploadedImg() {
        return this.uploadedImg;
    }
    setUploadedImg(value) {
        this.uploadedImg = value;
        // console.log("setUploadedImg func success");
        // console.log(this.uploadedImg);
    }
    dataCheck() {
        return this.gender !== 0 && this.uploadedImg !== null;
    }
    // state getter setter는 바뀜
    setState(value) {
        this.state = value;
    }
    getState() {
        return this.state;
    }
    setFormData(img) {
        this.formData = new FormData();
        this.formData.append("image", img);
        this.formData2 = new FormData();
        this.formData2.append("image", img);

        this.setUploadedImg(img);
    }

    //퍼스널 컬러 추천받고 저장하기
    postPerCol = async () => {
        this.resultList = null;
        const value = {
            gender: this.gender,
        };
        this.formData.append("request", JSON.stringify(value));
        // 이때 image, request 모두 담아 /colors/에 Post

        console.log("----1----");
        for (const keyValue of this.formData) console.log(keyValue); // ["img", File] File은 객체
        console.log("----1----");

        try {
            this.resultList = await axios({
                method: "POST",
                url: `/colors/`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
                data: this.formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
            });

            console.log("api 1 post 조회 성공");

            //저장

            const accessToken =
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";

            let session =
                this.resultList.data.result.session === "spring"
                    ? 1
                    : this.resultList.data.result.session === "summer"
                    ? 2
                    : this.resultList.data.result.session === "fall"
                    ? 3
                    : this.resultList.data.result.session === "winter"
                    ? 4
                    : "?";
            let save = {
                gender: this.gender,
                personalColor: session, // SPRING -> 1로 바꿔야됨!!!!!
                // TODO:
            };

            // 이 부분 테스트 필요
            // this.formData2.append("image", new File([""], "filename"));
            // this.formData2.append("image", this.getUploadedImg());
            this.formData2.append("request", JSON.stringify(save));
            console.log("----2----");
            for (const keyValue of this.formData2) console.log(keyValue); // ["img", File] File은 객체
            console.log("----2----");
            try {
                const saveResult = await axios({
                    method: "POST",
                    url: `/colors/personalColor`,
                    mode: "cors",
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                    data: this.formData2, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
                });
                // 없어도 됨
                console.log("--------");
                console.log(saveResult);
                console.log("--------");
                console.log("api 2 post 저장 성공");
            } catch (error) {
                console.log(error);
            }
            this.getHistory(); //저장하고 기록 다시 가져오기
        } catch (error) {
            console.log(error);
        }
    };
    // 히스토리의 추천 받았던 패션정보 불러오기
    getPerCol = async (personalColorId) => {
        this.resultList = null;
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        try {
            this.resultList = await axios({
                method: "GET",
                url: `/colors/personalColor/${personalColorId}`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            this.setUploadedImg(this.resultList.data.result.image);

            console.log(this.resultList);
        } catch (error) {
            console.log(error);
        }
    };

    getHistory = async () => {
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        try {
            this.historyList = await axios({
                method: "GET",
                url: `/colors/personalColor`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            // console.log(this.historyList);
        } catch (error) {
            console.log(error);
        }
    };
}

export default ToneAnalyzeModel;
