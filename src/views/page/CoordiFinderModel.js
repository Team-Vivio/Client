import axios from "axios";

class CoordiFinderModel {
    constructor() {
        this.gender = 0;
        this.closetActive = false;
        this.closetList = [];
        //key가 id, img로 이루어짐
        this.topList = [];
        this.bottomList = [];
        this.outerList = [];
        this.historyList = null;
        this.resultList = null;
        this.formData = new FormData();
        this.token = null;
    }
    setToken(token) {
        if (token === null || token === undefined) {
            console.log("토큰 없습니당");
            // token =
            //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        } else console.log("토큰 있습니당");
        this.token = token;
    }
    dataCheck() {
        return (
            this.gender !== null &&
            this.topList.length > 0 &&
            this.bottomList.length > 0
        );
    }
    setGender(value) {
        this.gender = value;
    }
    setClosetActive(value) {
        this.closetActive = value;
    }
    setTopList(list) {
        this.topList = list;
        // console.log(this.topList);
    }
    setBottomList(list) {
        this.bottomList = list;
        // console.log(this.bottomList);
    }
    setOuterList(list) {
        this.outerList = list;
        // console.log(this.bottomList);
    }
    getGender() {
        return this.gender;
    }
    getHistoryList() {
        if (this.historyList === null) {
            let list = [];
            for (let i = 0; i < 7; i++) {
                list.push({ id: "", image: "", style: "" });
            }
            return list;
        } else {
            let list = this.historyList.data.result.items;
            if (list.length < 7)
                for (let i = list.length; i < 7; i++) {
                    list.push({ id: "", image: "", style: "" });
                }
            else list = list.slice(0, 7);
            return list;
        }
    }
    getResultList() {
        return this.resultList === null
            ? null
            : this.resultList.data.result.items;
    }
    postFashion = async () => {
        try {
            this.formData = new FormData(); //초기화
            let top = [];
            let bottom = [];
            let outer = [];
            if (this.closetActive) {
                //상의 가져오기
                const topResult = await axios({
                    method: "GET",
                    url: `https://backend.vivi-o.site/users/closet/top`,
                    mode: "cors",
                    headers: {
                        Authorization: `${this.token}`,
                    },
                });
                const test = async () => {
                    console.log("테스트");
                    const url =
                        "https://image.msscdn.net/images/goods_img/20190910/1149329/1149329_16760172077751_big.jpg";
                    const response = await fetch(url);
                    const data = await response.blob();
                    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
                    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
                    const metadata = { type: `image/${ext}` };
                    const result = new File([data], filename, metadata);
                    console.log(result);
                };
                test();
                const imageCachedUrl = (url) => {
                    const imgUrl = /^data:image/.test(url)
                        ? url
                        : url + "?" + new Date().getTime();
                    return imgUrl;
                };
                //나만의 옷장 상의 파일 변환
                topResult.data.result.images.map(async (value) => {
                    //console.log(value.image);
                    const url = imageCachedUrl(value.image);
                    const response = await fetch(url);
                    const data = await response.blob();
                    const ext = value.image.split(".").pop(); // url 구조에 맞게 수정할 것
                    const filename = value.image.split("/").pop(); // url 구조에 맞게 수정할 것
                    const metadata = { type: `image/${ext}` };
                    const closetTop = new File([data], filename, metadata);
                    console.log(closetTop);
                    top.push(closetTop);
                });

                //하의 가져오기
                const bottomResult = await axios({
                    method: "GET",
                    url: `https://backend.vivi-o.site/users/closet/bottom`,
                    mode: "cors",
                    headers: {
                        Authorization: `${this.token}`,
                    },
                });
                //나만의 옷장 하의 파일 변환
                bottomResult.data.result.images.map(async (value) => {
                    const url = imageCachedUrl(value.image);
                    const response = await fetch(url);
                    const data = await response.blob();
                    const ext = value.image.split(".").pop(); // url 구조에 맞게 수정할 것
                    const filename = value.image.split("/").pop(); // url 구조에 맞게 수정할 것
                    const metadata = { type: `image/${ext}` };
                    const closetBottom = new File([data], filename, metadata);
                    bottom.push(closetBottom);
                });

                //아우터 가져오기
                const outerResult = await axios({
                    method: "GET",
                    url: `https://backend.vivi-o.site/users/closet/outer`,
                    mode: "cors",
                    headers: {
                        Authorization: `${this.token}`,
                    },
                });
                //나만의 옷장 아우터 파일 변환
                outerResult.data.result.images.map(async (value) => {
                    const url = imageCachedUrl(value.image);
                    const response = await fetch(url);
                    const data = await response.blob();
                    const ext = value.image.split(".").pop(); // url 구조에 맞게 수정할 것
                    const filename = value.image.split("/").pop(); // url 구조에 맞게 수정할 것
                    const metadata = { type: `image/${ext}` };
                    const closetOuter = new File([data], filename, metadata);
                    outer.push(closetOuter);
                });
            }

            //상의 id 뺀 리스트 만들어야함
            this.topList.map((value) => {
                top.push(value.file);
            });
            console.log(top);
            top.forEach((file) => {
                this.formData.append("top", file);
            });

            //하의
            this.bottomList.map((value) => {
                bottom.push(value.file);
            });
            bottom.forEach((file) => {
                this.formData.append("bottom", file);
            });

            //아우터
            if (this.outerList.length !== 0 || outer.length !== 0) {
                this.outerList.map((value) => {
                    outer.push(value.file);
                });
                outer.forEach((file) => {
                    this.formData.append("outer", file);
                });
            }
            const value = {
                gender: this.gender,
            };
            this.formData.append("request", JSON.stringify(value));

            this.resultList = await axios({
                method: "POST",
                url: `https://backend.vivi-o.site/closets`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: this.formData,
            });
            //저장
            let saveData = { items: [] };
            this.resultList.data.result.items.map((value) => {
                saveData.items.push({
                    outer: value.outer,
                    top: value.top,
                    bottom: value.bottom,
                    fashionName: value.fashionName,
                });
            });
            const result = await axios({
                method: "POST",
                url: `https://backend.vivi-o.site/closets/closet`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
                data: saveData,
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    getHistory = async () => {
        try {
            this.historyList = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/closets/closet`,
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
    getCoordi = async (coordiID) => {
        console.log(coordiID);
        try {
            this.resultList = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/closets/closet/${coordiID}`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            console.log(this.resultList);
        } catch (error) {
            console.log(error);
        }
    };
}
export default CoordiFinderModel;
