export const environment = {
    production: true,
    baseUrl: 'https://chouihub.com/crwal/',
    getUrl: (_url) => {
        return environment.baseUrl + _url;
    }
};
