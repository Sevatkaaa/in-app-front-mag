import axios from "axios";

const url = "localhost:8080"

export const addProjectLogo = (logo, id) => {
    let formData = new FormData();
    formData.append('logo', logo);
    return axios.post(`http://${url}/api/file/projectLogo/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`,
        }
    });
};

export const addInvestorPhoto = (logo, id) => {
    console.log(id);
    console.log(logo);
    let formData = new FormData();
    formData.append('logo', logo);
    return axios.post(`http://${url}/api/file/investorPhoto/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`,
        }
    });
};
