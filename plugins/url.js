/*判断环境使用不同接口*/
export let baseurl = process.env.NODE_ENV === 'production' ? 'https://www.zmln1021.cn' : 'http://localhost:8080';
