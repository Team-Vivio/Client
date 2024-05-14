import axios from "axios";

class ClothesFinderModel {
    constructor() {
        this.name = "이름";
        this.gender = 0;
        this.clo_type = 0;
        this.uploadedImg = null;
        this.uploadedImgLink = null;
        this.resultList = [];
        this.formData = new FormData();
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
                url: `/search/clothes`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: this.formData,
            });

            // Verify if request is successful
            if (response && response.status === 200) {
                this.resultList = response.data; // Assuming data contains the result
            } else {
                console.error("Failed to get data:", response);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };
}

export default ClothesFinderModel;
