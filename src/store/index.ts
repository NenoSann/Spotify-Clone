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
        accessToken: localStorage.getItem('accessToken') === 'null' ? null : JSON.parse(localStorage.getItem('accessToken') as string),
        PCKE_Code: '',
    }),
    getters: {

    },
    actions: {
        async fetchAccessToken() {
            if (this.accessToken !== null) {
                if (Date.now() - new Date(this.accessToken.created_at).getTime() > this.accessToken.expires_in * 1000) {
                    // token has expired
                    const componentStateStore = componentState();
                    componentStateStore.redirect = true;
                    await this.requestPCKE_token();
                    console.log('Token expired,', this.accessToken)
                }
            } else {
                // currently don't have token
                const componentStore = componentState();
                componentStore.redirect = true;
                await this.requestPCKE_token();
                componentStore.redirect = false;
            }
            console.log('token ok, ', this.accessToken)
        },
        async redirectToSpotify() {
            redirectToSpotify();
        },
        async retriveCode() {
            this.PCKE_Code = retriveParams();
            console.log('retrive code:', this.PCKE_Code)
        },
        async requestPCKE_token() {
            if (this.PCKE_Code !== '') {
                const res = await getAccessToken_PKCE(this.PCKE_Code);
                console.log('PCKE token: ', res)
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