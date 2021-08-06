import axios from 'axios'
import store from '@/store'
import {Message} from 'view-design'
import {
    getToken
} from '@/libs/util'
let msg = null;
class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    getInsideConfig(options) {
        let config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        };
        if (!options.isNoToken && getToken()) {
            config.headers = {
                "Authorization": "Bearer " + getToken()
            }
        }
        return config
    }

    destroy(url) {
        setTimeout(msg, 600);
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const {data, status} = res;

            if (data.code !== 200) {
                Message.error(data.message);
            }
            return data
        }, error => {
            this.destroy(url)

            let errorInfo = error.response
            if (!errorInfo) {
                const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
                errorInfo = {
                    statusText,
                    status,
                    request: {responseURL: config.url}
                }
            }
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(options), options)
        if (options.loading) {
            msg = Message.loading({
                content: options.loadText || 'Loading...',
                duration: 0
            });
        }
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest
