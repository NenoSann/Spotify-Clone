import type { Ref } from "vue"

interface UserInfo {
    username: Ref<string>,
    imageURL: Ref<string>,
}

export type { UserInfo }