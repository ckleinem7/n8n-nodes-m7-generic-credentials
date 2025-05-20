import type { IAuthenticateGeneric, ICredentialDataDecryptedObject, ICredentialType, IHttpRequestHelper, INodeProperties } from 'n8n-workflow';
export declare class M7GenericOAuth2Api implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject): Promise<{
        sessionToken: string;
    }>;
    authenticate: IAuthenticateGeneric;
}
