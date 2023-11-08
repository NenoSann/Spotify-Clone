import { axiosInstance } from "../index";
import type { playlist } from "@/lib/interface";
// const axiosInstance = createAxiosInstance('');

// fetch the current user's playlist, the bearear is added by interceptor
const getCurrentPlaylist = async function (limit?: number, offset?: number): Promise<playlist> {
    let params = {};

    if (limit || offset) {
        // if limit or offset is provided, use them as search params
        params = {
            limit: limit || undefined,
            offset: offset || undefined,
        };
    }

    try {
        let userPlaylist: playlist = (
            await axiosInstance.get('/me/playlists', { params })
        ).data;
        console.log('fetching playlist success: ', userPlaylist);
        return userPlaylist;
    } catch (error) {
        console.error('Error fetching playlist: ', error);
        throw error;
    }
};

export { getCurrentPlaylist }