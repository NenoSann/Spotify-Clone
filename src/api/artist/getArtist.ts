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

export { getArtist, getArtistTopTracks }