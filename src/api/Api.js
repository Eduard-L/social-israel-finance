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

    async handleVerifyId(id) {
        debugger
        const requestOptions = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: id,
            }),
        };
        const employeInfo = await fetch(`${this._baseUrl}/auth/verify`, requestOptions);

        return this._checkResponse(employeInfo)
    }
}


export const api = new Api("https://096invd60f.execute-api.eu-central-1.amazonaws.com");