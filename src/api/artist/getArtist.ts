import { axiosInstance } from "../index";
import type { artist, track } from "@/lib/interface";



const getArtist = async function (artistId: string): Promise<artist> {
    try {
        const res = await axiosInstance.get(`/artists/${artistId}`);
        return res.data as artist;
    } catch (error) {
        console.log('error on fetching');
        console.error(error);
        throw error;
    }
}

const getArtistTopTracks = async function (artistId: string, market: string): Promise<track[]> {
    try {
        const res = await axiosInstance.get(`/artists/${artistId}/top-tracks`, {
            params: {
                market
            }
        });
        return res.data as track[];
    } catch (error) {
        console.log('fetch artist topTracks error');
        console.error(error);
        throw error;
    }
}

interface ArtistAlbumsResponse {
    href: string;
    items: SimplifiedAlbumObject[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

interface SimplifiedAlbumObject {
    album_type: string;
    artists: ArtistObject[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
}

interface ArtistObject {
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface ImageObject {
    height: number | null;
    url: string;
    width: number | null;
}
const getArtistAlbum = async function (id: string,
    limit: number,
    include_groups?: 'album' | 'single' | 'appears_on' | 'complication' | string,
    market?: string): Promise<ArtistAlbumsResponse> {
    // set default value for market
    market = market ? market : 'JP';
    include_groups = include_groups ? include_groups : 'single,appears_on';
    try {
        const res = await axiosInstance.get(`/artists/${id}/albums`, {
            params: {
                include_groups,
                limit,
                market
            }
        })
        return res.data as ArtistAlbumsResponse;
    } catch (error) {
        console.log('fetch artist album error');
        throw error;
    }
}
interface Artist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
        url: string;
        height: number | null;
        width: number | null;
    }[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
}
const getArtistRelatedArtist = async function (id: string): Promise<Artist[]> {
    try {
        const res = await axiosInstance.get(`/artists/${id}/related-artists`);
        return res.data.artists as Artist[];
    } catch (error) {
        console.log('fetch related artist error');
        console.error(error);
        throw error;
    }
}
export { getArtist, getArtistTopTracks, getArtistAlbum, getArtistRelatedArtist }
export type { ArtistAlbumsResponse, SimplifiedAlbumObject };