import type { Ref } from "vue"

interface UserInfo {
    username: Ref<string>,
    imageURL: Ref<string>,
}

interface userImage {
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
    images: userImage[],
    product: 'premium' | 'free' | 'open',
    type: 'user',
    uri: string,
}

export type { UserInfo, userImage, userProfile }