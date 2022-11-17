import Axios from "axios";

const path = "https://portfolio-react-next-backend.herokuapp.com";
// const path = "http://127.0.0.1:8080";
const master = "Whdrms6533@";

function makeURL(category: string, method: string) {
    switch (method) {
        case "get": {
            return path + "/" + category;
        }
        case "update": {
            return path + "/" + category + "/change";
        }
        case "delete": {
            return path + "/" + category + "/";
        }
        default: {
            return path + "/" + category;
        }
    }
}

async function get(category: string, key: string = master) {
    let result = {};
    await Axios.post(
        makeURL(category, "get"),
        {
            key: key,
        },
        {
            withCredentials: false, // 쿠키 cors 통신 설정
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "Token",
                "Access-Control-Allow-Origin": "*",
            },
        }
    )
        .then((res) => {
            result = res;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    return result;
}

async function getKey(category: string, key: string = master) {
    let result = {
        data: {
            data: [
                {
                    token: "",
                },
            ],
        },
    };
    await Axios.post(
        makeURL(category, "get"),
        {
            key: key,
        },
        {
            withCredentials: false, // 쿠키 cors 통신 설정
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "Token",
                "Access-Control-Allow-Origin": "*",
            },
        }
    )
        .then((res) => {
            result = res;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    return result.data.data[0].token;
}

export { get, getKey };
