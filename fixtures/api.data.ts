
export const _api = {
    host: `https://staging-api.dns.com/api/v1/`,
    users:{
        me:'users/me/'
    },
    auth:{
        token: 'auth/token/'
    },
    headers: (token?: string) => token ? JSON.parse(JSON.stringify({
        'Accept': 'application/json, text/plain, */*',
        'Authorization': `Token ${token}`
    })):JSON.parse(JSON.stringify({ 'Accept': 'application/json, text/plain, */*'}))
};