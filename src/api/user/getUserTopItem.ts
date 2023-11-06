import { axiosInstance } from "../index";
import type { topItem } from "@/lib/interface";

// fetch the userProfile, the bearear is added by interceptor
const getUserTopItem = async function (type: 'tracks' | 'artists',
    time_range: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
    limit: number = 10,
    offset: number = 0): Promise<topItem> {
    let topItem: topItem = (await axiosInstance.get(`/me/top/${type}`, {
        params: {
            time_range,
            limit,
            offset
        }
    })).data;
    console.log(topItem);
    return topItem;
}

export { getUserTopItem }