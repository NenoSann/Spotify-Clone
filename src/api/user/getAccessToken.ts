import axios from "axios";
const client_id: string = '383383794816486fa3488a9ba4218b0b';
const client_secret: string = '7100aaf51ac949ecac62cd61126d4fc9';
const authorization = 'Basic ' + btoa(client_id + ':' + client_secret);
const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');


// define the accessTokenBody
interface accessTokenBody {
    access_token: string,
    expires_in: number,
    token_type: string,
    refresh_token?: string,
    created_at: Date,
}

const retriveParams = function (): string {
    if (window.location.search.includes('code')) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        return code as string;
    } else {
        return '';
    }
}

// get PKCE token from retrivedParms
const getAccessToken_PKCE = async function (code: string): Promise<accessTokenBody> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:5173');
    params.append('client_id', client_id);
    params.append('code_verifier', window.localStorage.getItem('code_verifier') as string);
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    })
    let responseData: accessTokenBody;
    responseData = response.data;
    responseData.created_at = new Date();
    return responseData as accessTokenBody;
}

// redirect to spotify login apge
const redirectToSpotify = async function () {
    const generateRandomString = (length: number) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    const codeVerifier = generateRandomString(64);

    const sha256 = async (plain: string) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input: any) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
    const redirectUri = 'http://localhost:5173';
    const scope = 'user-read-private user-read-email user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative user-follow-read user-follow-modify';
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    console.log('code_verifier set,', codeVerifier);
    window.localStorage.setItem('code_verifier', codeVerifier);
    const params2 = {
        response_type: 'code',
        client_id: client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }
    authUrl.search = new URLSearchParams(params2).toString();
    window.location.href = authUrl.toString();
}


/**
 * @description fetch spotify user access token, and return it
 * @returns {accessTokenBody}
 */
const getAccessToken = async function (): Promise<accessTokenBody> {
    let responseData: accessTokenBody = {
        access_token: 'null',
        expires_in: 0,
        token_type: 'Bearer',
        created_at: new Date(),
    };
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
            'Authorization': authorization,
            "Content-Type": 'application/x-www-form-urlencoded'
        },
    })
    responseData = response.data;
    responseData.created_at = new Date();
    return responseData;
}

export { getAccessToken, getAccessToken_PKCE, retriveParams, redirectToSpotify };
export type { accessTokenBody };
