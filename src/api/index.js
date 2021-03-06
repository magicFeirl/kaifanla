import axios from 'axios'
import message from '../components/MessageBox'

const http = axios.create({
    baseURL: 'http://mengtion.vip/kfl-api/api/'
})

http.interceptors.request.use(config => {
    return config
}, (error) => {
    message('加载出错：网络请求失败', 'danger', 10000)
    return Promise.reject(error)
})

export async function getProducts(keyword = '', start = 1, length = 10) {
    if (keyword === '') {
        const { data } = await http.post('/getproduct.php', "start=" + start + "&length=" + length)
        return data
    } else {
        return await searchProduct(keyword, start, length)
    }
}


export async function getOrderInfo(start = 0, length = 5) {
    const { data } = await http.post('/orderInfo.php', 'start=' + start + '&length=' + length)

    return data
}

export async function addOrder(did, tel, userName, sex, address) {
    const { data } = await http.post('/addOrder.php', 'did=' + did + '&tel=' + tel + '&userName=' + userName + '&sex=' + sex + '&address=' + address)

    return data
}

export async function getProduct(did) {
    const { data } = await http.post('/getItem.php', 'did=' + did)
    return data
}

export async function searchProduct(keyword, start = 1, length = 10) {
    const { data } = await http.post('/searchval.php', 'keyword=' + keyword + '&start=' + start + '&length=' + length)

    return data
}