import { axiosInstance } from "../index";
import type { userProfile } from "@/lib/interface";
// const axiosInstance = createAxiosInstance('');

// fetch the userProfile, the bearear is added by interceptor
const getUserProfile = async function (): Promise<userProfile> {
    let userProfile: userProfile = (await axiosInstance.get('/me')).data;
    console.log('fetching userProfile success, ', userProfile);
    return userProfile;
}

export { getUserProfile }