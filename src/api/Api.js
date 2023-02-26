export class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl
    }

    _checkResponse(res) {
        if (res) {
            return res.json()
        } else {
            Promise.reject(res)
        }
    }

    async handleVerifyId(id, method) {
        const requestOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id,
                method: method
            }),
        };
        const employeInfo = await fetch(`${this._baseUrl}/auth/login`, requestOptions);

        return this._checkResponse(employeInfo)
    }

    async handleVerifyCode(id, code) {
        const requestOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id,
                code: code
            }),
        };
        const employeInfo = await fetch(`${this._baseUrl}/auth/verify`, requestOptions);

        return this._checkResponse(employeInfo)
    }

    async handleSubmit(employeeForm, file, userId) {
        const requestOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...employeeForm
            }),
        };
        const employeInfo = await fetch(`${this._baseUrl}/employee/submit`, requestOptions);

        return this._checkResponse(employeInfo)
    }
}


export const api = new Api("https://umyoo0vvnc.execute-api.eu-central-1.amazonaws.com");