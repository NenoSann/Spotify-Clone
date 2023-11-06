import { createPinia, defineStore } from "pinia";
import { getAccessToken, getAccessToken_PKCE, retriveParams, type accessTokenBody, redirectToSpotify } from "@/api/user/getAccessToken";
import { getUserProfile } from "@/api/user/getUserProfile";
import type { userProfile } from "@/lib/interface";
const pinia = createPinia();
const useUserStore = defineStore('user', {
    state: () => ({
        // some weird type chagne
        userProfile: JSON.parse(localStorage.getItem('userProfile') as string) as userProfile || null
    }),
    actions: {
        async fetchUserProfile() {
            const userProfile = await getUserProfile();
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            this.userProfile = userProfile;
        }
    }
});
const accessToken = defineStore('accessToken', {
    state: () => ({
        accessToken: JSON.parse(localStorage.getItem('accessToken') as string) as accessTokenBody || null,
        PCKE_Code: '',
    }),
    getters: {

    },
    actions: {
        async fetchAccessToken() {
            if (this.accessToken !== null) {
                if (Date.now() - new Date(this.accessToken.created_at).getTime() > this.accessToken.expires_in * 1000) {
                    // token has expired
                    console.log(Date.now() - new Date(this.accessToken.created_at).getTime(), this.accessToken.expires_in * 1000)
                    const componentStateStore = componentState();
                    componentStateStore.redirect = true;
                    await this.requestPCKE_token();
                    console.log('Token expired,', this.accessToken)
                }
            } else {
                // currently don't have token
                await this.requestPCKE_token();
                localStorage.setItem('accessToken', JSON.stringify(this.accessToken));
            }
        },
        async redirectToSpotify() {
            redirectToSpotify();
        },
        async retriveCode() {
            this.PCKE_Code = retriveParams();
        },
        async requestPCKE_token() {
            if (this.PCKE_Code !== '') {
                const res = await getAccessToken_PKCE(this.PCKE_Code);
                window.localStorage.setItem('accessToken', JSON.stringify(res));
                this.accessToken = res;
            }
        }
    }
});
const componentState = defineStore('componentState', {
    state: () => ({
        redirect: false,
    }),
})
export { pinia, useUserStore, accessToken, componentState };