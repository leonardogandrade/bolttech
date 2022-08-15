import jwt_decode from 'jwt-decode';
export const tokenKey = "@my-personal-web-token";
export const isAuthenticated = () => localStorage.getItem(tokenKey) !== null;
export const getToken = () => localStorage.getItem(tokenKey);

export const getFullName = () => {
    const decodedToken = jwt_decode(getToken());
    return decodedToken.fullname;
}

export const getUserId = () => {
    const decodedToken = jwt_decode(getToken());
    return decodedToken.id;
}

export const login = token => {
    localStorage.setItem(tokenKey, token);
};

export const logout = () => {
    localStorage.removeItem(tokenKey);
};
