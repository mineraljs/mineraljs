export class HttpClient {

    get(url: string) {
        return this.doRequest(url, {
            mode: 'GET'
        })
    }

    put(url: string) {
        return this.doRequest(url, {
            mode: 'PUT'
        })
    }

    post(url: string) {
        return this.doRequest(url, {
            mode: 'POST'
        })
    }

    delete(url: string) {
        return this.doRequest(url, {
            mode: 'DELETE'
        })
    }

    private doRequest(url, options) {
        return fetch(url, options)
    }

}
