
import { axiosInstance } from "../index";


// fetch the userProfile, the bearear is added by interceptor
/**
 * @description A universal request method for userItem
 * @param path the request path for the endpoint
 * @returns A promise with requested item
 */
const getUserItemUniversal = async function (path: string, params?: object) {
    const requestPath = `/me${path}`;
    let userItem = (await axiosInstance.get(requestPath, { params })).data;
    console.log('fetching userItem success, ', userItem);
    return userItem;
}

export { getUserItemUniversal }