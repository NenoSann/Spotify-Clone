import type { Ref } from "vue"

interface UserInfo {
    username: Ref<string>,
    imageURL: Ref<string>,
}

interface image {
    url: string,
    height: number,
    width: number
}

interface userProfile {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: {
        spotify: string,
    },
    followers: {
        href: null,
        total: number,
    },
    href: string,
    id: string,
    images: image[],
    product: 'premium' | 'free' | 'open',
    type: 'user',
    uri: string,
}
interface artist {
    external_urls: object,
    followers: object,
    genres: string[],
    href: string,
    id: string,
    images: image[],
    name: string,
    popularity: number,
    type: string,
    uri: string
}

interface track {
    album: album,
    artist: artist[],
    avaliable_market: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: string,
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: object,
    restrictions: object,
    name: string,
    popularity: number,
    preview_url?: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
}
interface album {
    album_type: string,
    total_tracks: number,
    avaliable_markets: string[],
    external_urls: string,
    href: string,
    id: string,
    images: image[],
    name: string,
    release_date: string,
    release_date_precision: string,
    restrictions: object,
    type: string,
    uri: string,
    artists: artist[],
}

interface topItem {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: artist[] | track[]
}

export type { UserInfo, image, userProfile, topItem, artist, track, album }