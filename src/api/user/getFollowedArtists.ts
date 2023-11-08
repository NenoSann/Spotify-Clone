import { getUserItemUniversal } from "./getUserItemUniversal";
import type { artist } from "@/lib/interface";
interface followerdArtists {
    artists: {
        href: string,
        limit: number,
        next: string,
        cursors: {
            after: string,
            before: string
        },
        total: number,
        items: artist[]
    }
}
const getFollowedArtists = async function (): Promise<followerdArtists> {
    const res: followerdArtists = await getUserItemUniversal('/following', { 'type': 'artist', 'limit': 6 })
    return res;
}

export { getFollowedArtists }