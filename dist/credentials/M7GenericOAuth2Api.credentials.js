"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M7GenericOAuth2Api = void 0;
class M7GenericOAuth2Api {
    constructor() {
        this.name = 'm7GenericOAuth2Api';
        this.displayName = 'M7 Generic OAuth2 API';
        this.documentationUrl = 'httprequest';
        this.properties = [
            {
                displayName: 'Session Token',
                name: 'sessionToken',
                type: 'hidden',
                typeOptions: {
                    expirable: true,
                    password: true,
                },
                default: '',
            },
            {
                displayName: 'Token Url',
                name: 'tokenUrl',
                type: 'string',
                required: true,
                default: 'https://your-domain.eu.auth0.com/oauth/token',
            },
            {
                displayName: 'Audience',
                name: 'audience',
                type: 'string',
                required: false,
                default: '',
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                required: true,
                default: '',
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                required: true,
                default: '',
            }
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.sessionToken}}',
                },
            },
        };
    }
    async preAuthentication(credentials) {
        const body = {
            client_id: credentials.clientId.toString(),
            client_secret: credentials.clientSecret.toString(),
            grant_type: 'client_credentials',
        };
        if (credentials.audience) {
            body.audience = credentials.audience.toString();
        }
        const { access_token } = (await this.helpers.httpRequest({
            method: 'POST',
            url: credentials.tokenUrl.toString(),
            body: new URLSearchParams(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }));
        return { sessionToken: access_token };
    }
}
exports.M7GenericOAuth2Api = M7GenericOAuth2Api;
//# sourceMappingURL=M7GenericOAuth2Api.credentials.js.map