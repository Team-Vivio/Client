class ClothesFinderModel {
    constructor() {
        this.name = "이름";
        this.gender = 0;
        this.clo_type = 0;
        this.uploadedImg = null;
        this.state = "main";
        this.resultList = [];
        this.formData = new FormData();
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getGender() {
        return this.gender;
    }
    setGender(value) {
        this.gender = value;
    }
    getUploadedImg(value) {
        return this.uploadedImg;
    }
    setUploadedImg(value) {
        this.uploadedImg = value;
        // console.log(this.uploadedImg);
    }
    getResultList() {
        return this.resultList;
    }
}
export default ClothesFinderModel;
