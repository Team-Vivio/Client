class ClothesFinderModel {
    constructor(model) {
        this.model = model;
    }

    // getter setter 재정립 예정
    // model에선 logic 건드리지 않는 식으로

    setGender(value) {
        this.gender = value;
    }
    getUploadedImg(value) {
        return this.uploadedImg;
    }
    setUploadedImg(value) {
        this.model.uploadedImg(value);
        console.log(this.uploadedImg);
    }
    getResultList() {
        return this.resultList;
    }
    dataCheck() {
        return (
            this.model.gender !== 0 &&
            this.model.clo_type !== 0 &&
            this.uploadedImg !== null
        );
    }
    // setFormData(img) {
    //     this.formData.append("image", img);
    // }
}
export default ClothesFinderModel;
