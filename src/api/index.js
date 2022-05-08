import axios from 'axios'

const http = axios.create({
    baseURL: '/api'
})

export async function getProducts(keyword = '', start = 1, length = 10) {
    if (keyword === '') {
        const { data } = await http.post('/getproduct.php', "start=" + start + "&length=" + length)
        return data
    } else {
        return await searchProduct(keyword, start, length)
    }
}

export async function getProduct(did) {
    const { data } = await http.post('/getItem.php', 'did=' + did)
    return data
}

export async function searchProduct(keyword, start = 1, length = 10) {
    const { data } = await http.post('/searchval.php', 'keyword=' + keyword + '&start=' + start + '&length=' + length)

    return data
}