class ClothesFinderViewModel {
    constructor(model) {
        this.model = model;
    }

    // getter setter 재정립 예정
    // model에선 logic 건드리지 않는 식으로

    setGender(value) {
        this.model.gender = value;
    }
    getUploadedImg(value) {
        return this.model.uploadedImg;
    }
    setUploadedImg(value) {
        this.model.setUploadedImg(value);
        // console.log(this.uploadedImg);
    }
    getResultList() {
        return this.model.resultList;
    }
    dataCheck() {
        return (
            this.model.gender !== 0 &&
            this.model.clo_type !== 0 &&
            this.model.uploadedImg !== null
        );
    }
    // setFormData(img) {
    //     this.model.formData.append("image", img);
    // }
}
export default ClothesFinderViewModel;
