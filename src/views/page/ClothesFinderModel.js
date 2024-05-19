import axios from "axios";

class ClothesFinderModel {
    constructor() {
        this.name = "이름";
        this.gender = 0;
        this.clo_type = 0;
        this.uploadedImg = null;
        this.uploadedImgLink = null;
        this.resultList = [];
        this.resultListItem = [];
        this.resultListItemAsc = [];
        this.resultListItemDesc = [];
        this.formData = new FormData();
    }
    getResultListItem() {
        return this.resultListItem;
    }
    getResultListItemAsc() {
        return this.resultListItemAsc;
    }
    getResultListItemDesc() {
        return this.resultListItemDesc;
    }
    setResultListItemAsc() {
        if (Array.isArray(this.resultList.result.items)) {
            this.resultListItemAsc = this.resultList.result.items
                .slice()
                .sort((a, b) => a.price - b.price);
        } else {
            console.error("resultList is not an array:", this.resultList);
            this.resultListItemAsc = [];
        }
    }
    setResultListItemDesc() {
        if (Array.isArray(this.resultList.result.items)) {
            this.resultListItemDesc = this.resultList.result.items
                .slice()
                .sort((a, b) => b.price - a.price);
        } else {
            console.error("resultList is not an array:", this.resultList);
            this.resultListItemDesc = [];
        }
    }

    getUploadedImgLink() {
        return this.uploadedImgLink;
    }
    setUploadedImgLink(value) {
        this.uploadedImgLink = value;
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

    getType() {
        return this.clo_type;
    }

    setType(value) {
        this.clo_type = value;
    }

    getUploadedImg() {
        return this.uploadedImg;
    }

    setUploadedImg(value) {
        this.uploadedImg = value;
    }

    getResultList() {
        return this.resultList;
    }

    postClothes = async () => {
        // Check if an image is uploaded
        if (!this.getUploadedImg()) {
            console.error("No image uploaded.");
            return;
        }

        // Clear formData before appending
        this.formData = new FormData();
        this.formData.append("image", this.getUploadedImg());

        const value = {
            type: this.getType(),
        };
        this.formData.append("request", JSON.stringify(value)); // Ensure value is stringified

        try {
            const response = await axios({
                method: "POST",
                url: `https://backend.vivi-o.site/search/clothes`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: this.formData,
            });

            // Verify if request is successful
            if (response && response.status === 200) {
                this.resultList = response.data; // Assuming data contains the result
                this.resultListItem = this.resultList.result.items;
            } else {
                console.error("Failed to get data:", response);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }

        // 가격순 정렬
        await this.setResultListItemAsc();
        await this.setResultListItemDesc();
        console.log("@@@@@@@@@@@@@");
        console.log("resultListItemAsc :" + this.resultListItemAsc);
        console.log("resultListItemDesc :" + this.resultListItemDesc);
        console.log("@@@@@@@@@@@@@");
    };
}

export default ClothesFinderModel;
