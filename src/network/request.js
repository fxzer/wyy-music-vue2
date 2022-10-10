import axios from 'axios'

export default function http(url, params) {
    const instance = axios.create({
            baseURL: '/api',
            timeout: 30000,
            withCredentials: true,
        })
        // 请求拦截
    instance.interceptors.request.use((config) => {
        return config
    }, error => {
        return error
    })

    // 响应拦截
    instance.interceptors.response.use((config) => {
            return config.data
        }, error => {
            this.$notify({
                type: 'error',
                title: '响应错误!'
            })
            return error
        })
        // 请求
    if (params) {
        params = {
            params: params
        }
        return instance.get(url, params)
    } else {
        return instance.get(url)
    }
}