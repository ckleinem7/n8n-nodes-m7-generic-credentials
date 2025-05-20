import type {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties
} from 'n8n-workflow';

export class m7GenericOAuth2Api implements ICredentialType {
	name = 'm7GenericOAuth2Api';
	displayName = 'M7 Generic OAuth2 API';

	documentationUrl = 'httprequest';

	properties: INodeProperties[] = [
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

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const body: Record<string, string> = {
			client_id: credentials.clientId.toString(),
			client_secret: credentials.clientSecret.toString(),
			grant_type: 'client_credentials',
		}
		if (credentials.audience) {
			body.audience = credentials.audience.toString();
		}

		const {access_token} = (await this.helpers.httpRequest({
			method: 'POST',
			url: credentials.tokenUrl.toString(),
			body: new URLSearchParams(body),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})) as { access_token: string };
		return {sessionToken: access_token};
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.sessionToken}}',
			},
		},
	};
}
