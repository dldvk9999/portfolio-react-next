import Axios from "axios";

const path = "https://portfolio-next-backend.vercel.app/";
// const path = "http://127.0.0.1:8080";
const master = "Whdrms6533@";
const header = {
    withCredentials: false, // 쿠키 cors 통신 설정
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "Token",
        "Access-Control-Allow-Origin": "*"
    },
};

function makeURL(category: string, method: string) {
    switch (method) {
        case "get": {
            return path + "/" + category;
        }
        case "update": {
            return path + "/" + category + "/change";
        }
        case "create": {
            return path + "/" + category + "/create";
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
        header
    )
        .then((res) => {
            result = res;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    return result;
}

async function update(category: string, update: any, key: string = master) {
    let result: boolean = false;
    await Axios.post(makeURL(category, "update"), { ...update, key: key }, header)
        .then((_) => (result = true))
        .catch((err) => console.log(err));
    return result;
}

async function create(category: string, create: any, key: string = master) {
    let result: boolean = false;
    await Axios.post(makeURL(category, "create"), { ...create, key: key }, header)
        .then((_) => (result = true))
        .catch((err) => console.log(err));
    return result;
}

async function del(category: string, id: number, key: string = master) {
    let result: boolean = false;
    console.log(makeURL(category, "delete") + id.toString());
    await Axios.delete(makeURL(category, "delete") + id.toString(), {
        ...header,
        data: { key: key },
    })
        .then((_) => (result = true))
        .catch((err) => console.log(err));
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
        header
    )
        .then((res) => {
            result = res;
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    return result.data.data[0].token;
}

export { get, update, create, del, getKey };
