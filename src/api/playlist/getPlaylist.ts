import { axiosInstance } from "../index";
import type { album as Album, artist as Artist } from "@/lib/interface";
interface PlaylistItem {
    href: string,
    limit: string,
    next?: string,
    offset: number,
    total: number,
    items: {
        added_at?: string,
        added_by?: {
            id: string,
            uri: string
        },
        is_local: boolean,
        track: {
            album: Album,
            artists: Artist[],
            available_markets: string[],
            disc_number: number,
            duration_ms: number,
            explicit: boolean,
            href: string,
            id: string,
            is_playable: boolean,
            linked_from: object,
            restrictions: {
                reason: string
            },
            name: string,
            popularity: number,
            track_number: number,
            type: 'track',
            uri: string,
            is_local: boolean
        }
    }[]
}

const getPlaylist = async function (id: string, market?: string, limit?: number, offset?: number): Promise<PlaylistItem> {
    market = market ? market : 'JP';
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/playlists/${id}/tracks`).then((res) => {
            resolve(res.data as PlaylistItem);
        }).catch((error) => {
            console.log('fetch playlist item error');
            reject(error);
        })
    })
}

export { getPlaylist }
export type { PlaylistItem }