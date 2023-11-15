import { axiosInstance } from "../index";
import type { track } from "@/lib/interface";

interface savedTrack {
    href: string,
    limit: number,
    next?: string,
    offset: number,
    previous?: string,
    total: number,
    items: {
        added_at: string,
        track: track[],
    }[]
}

const getSavedTrack = async function (market?: string, limit?: number, offset?: number): Promise<savedTrack | Error> {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/me/tracks', {
            params: {
                market,
                limit,
                offset
            }
        }).then((res) => {
            resolve(res.data as savedTrack);
        }).catch((error) => {
            console.log('fetch savedTrack error');
            reject(error as Error);
        })
    })
}

export { getSavedTrack }
export type { savedTrack }