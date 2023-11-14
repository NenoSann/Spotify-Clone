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

interface PlayList {
    collaborative: boolean,
    description?: string,
    external_urls: {
        spotify: string
    },
    followers: {
        href?: string,
        total: number
    },
    href: string,
    id: string,
    images: {
        url: string,
        height?: number,
        width?: number
    }[],
    name: string,
    owner: {
        followers: {
            total: number
        },
        href: string,
        id: string,
        type: 'user',
        uri: string,
        display_name?: string
    },
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        limit: number,
        next?: string,
        offset: number,
        previous?: string,
        total: number,
        items: {
            added_at: string,
            added_by: {
                href: string,
                id: string,
                type: 'user',
                uri: string
            },
            is_local: boolean,
            track: {
                album: Album,
                artists: Artist[],
                disc_number: number,
                duration_ms: number,
                explicit: boolean,
                href: string,
                id: string,
                is_playable: boolean,
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
        }[],

    }
}


const getPlaylistItem = async function (id: string, market?: string, limit?: number, offset?: number): Promise<PlaylistItem> {
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

const getPlayList = async function (id: string, market?: string, limit?: number, offset?: number): Promise<PlayList> {
    market = market ? market : 'JP';
    return new Promise((resove, reject) => {
        axiosInstance.get(`playlists/${id}`, {
            params: {
                market,
                limit,
                offset
            }
        }).then((res) => {
            resove(res.data as PlayList);
        }).catch((error) => {
            console.log('fetch playlist error');
            reject(error);
        })
    })
}



export { getPlaylistItem, getPlayList }
export type { PlaylistItem, PlayList }