import { axiosInstance } from "../index";
import type { userProfile } from "@/lib/interface";
// const axiosInstance = createAxiosInstance('');

// fetch the userProfile, the bearear is added by interceptor
/**
 * @description This function is actually getCurrentUserProfile
 * @returns 
 */
const getUserProfile = async function (): Promise<userProfile> {
    let userProfile: userProfile = (await axiosInstance.get('/me')).data;
    console.log('fetching userProfile success, ', userProfile);
    return userProfile;
}

const getUser = async function (id: string): Promise<userProfile> {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/users/${id}`).then((res) => {
            resolve(res.data as userProfile);
        }).catch((error) => {
            console.log('fetch user profile fail');
            reject(error);
        })
    })
}


interface data {
    cd_nm: string,
    daily: {
        dailyData: {
            date: Date,
            value: number
        }[],
        start: Date,
        end: Date
    },

}[];


export { getUserProfile, getUser }