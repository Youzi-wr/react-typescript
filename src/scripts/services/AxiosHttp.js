
import axios from 'axios';
import { notification } from 'antd';
import errorMessage from '../utils/errorCode';

axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + sessionStorage.access_token;
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (!response.data.success && errorMessage[response.data.errorcode]) {
        notification["error"]({
            message: errorMessage[response.data.errorcode]
        });
    }
    return response.data;
}, function (error) {
    let errorcode = error.response.data.errorCode;
    if (errorcode) {
        notification["error"]({
            message: errorcode ? errorMessage[errorcode] : error.response.data.message
        });
    }
    return Promise.reject(error);
});

export default {
    get: function (url, params = {}) {
        return axios(url, { params: params });
    },
    post: function (url, data) {
        var headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        };
        return axios.post(url, data, { headers: headers });
    },
    put: function (url, data) {
        var param = new URLSearchParams(data);
        return axios.put(url, param, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    },
    putAsPost: function (url, data) {
        var headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        };
        return axios.put(url, data, { headers: headers });
    },
    closeSession: function (url, data) {
        var headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        };
        return axios.put(url, data, { headers: headers });
    },
    delete: function (url, data) {
        var param = new URLSearchParams(data);
        return axios.delete(url, param, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    },
    postAsForm: function (url, data) {
        var param = new URLSearchParams(data);
        return axios.post(url, param, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    },
    postAsUpload: function (url, param) {
        return axios.post(url, param, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}