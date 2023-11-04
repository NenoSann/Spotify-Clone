import { createAxiosInstance } from "../index";
import type { userProfile } from "@/lib/interface";
import { accessToken } from "@/store";
const axiosInstance = createAxiosInstance('');

// fetch the userProfile, the bearear is added by interceptor
const getUserProfile = async function (): Promise<userProfile> {
    let userProfile: userProfile = await axiosInstance().get('/me');
    console.log(userProfile);
    return userProfile;
}

export { getUserProfile }