import type { album } from "@/lib/interface";
import { axiosInstance } from "../index";
const getAlbum = async function (id: string, market?: string): Promise<album> {
    market = market ? market : 'JP';
    return new Promise<album>((resolve, reject) => {
        axiosInstance.get(`/albums/${id}`, {
            params: {
                market
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            console.log('fetch album error');
            console.error(error);
            reject(error);
        })
    })
}
const getAlbumTracks = async function (id: string, market?: string, limit?: number, offset?: number) {
    market = market ? market : 'JP';
    return new Promise((resove, reject) => {
        axiosInstance.get(`/albums/${id}/tracks`, {
            params: {
                market,
                limit,
                offset
            }
        }).then((res) => {
            resove(res.data);
        }).catch((error) => {
            console.log('fetch album tracks error');
            reject(error);
        })
    })
}
export { getAlbum, getAlbumTracks }