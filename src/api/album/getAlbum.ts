import { axiosInstance } from "../index";
import type { album } from "@/lib/interface";
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

export { getAlbum }