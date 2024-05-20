class ClothesFinderViewModel {
    constructor(model) {
        this.model = model;
        this.type = this.model.getType();
        this.uploadedImg = this.model.getUploadedImg();
        this.uploadedImgLink = this.model.getUploadedImgLink();
    }
    getResultListItem() {
        return this.model.getResultListItem();
    }
    getResultListItemAsc() {
        return this.model.getResultListItemAsc();
    }
    getResultListItemDesc() {
        return this.model.getResultListItemDesc();
    }

    getUploadedImgLink() {
        return this.model.getUploadedImgLink();
    }
    setUploadedImgLink(value) {
        this.uploadedImgLink = value;
    }
    getType() {
        return this.model.getType();
    }
    setType(value) {
        this.type = value;
    }
    getUploadedImg(value) {
        return this.model.getUploadedImg();
    }
    setUploadedImg(value) {
        this.uploadedImg = value;
    }
    update() {
        this.model.setType(this.type);
        this.model.setUploadedImg(this.uploadedImg);
        this.model.setUploadedImgLink(this.uploadedImgLink);
    }
    getResultList() {
        return this.model.getResultList();
    }
    dataCheck() {
        return (
            // this.model.clo_type !== 0 && this.model.getUploadedImg() !== null
            this.type !== 0 && this.uploadedImg !== null
        );
    }
    // revise
    postClothes = async () => {
        await this.model.postClothes();
    };
    getClothes = async (clothesID) => {
        await this.model.getClothes(clothesID);
    };
}
export default ClothesFinderViewModel;
