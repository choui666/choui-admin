export  function getUrl(_url) {
    return this.baseUrl + _url;
}

export const environment = {
    production: true,
    baseUrl: 'https://chouihub.com/crwal/',
    getUrl
};
