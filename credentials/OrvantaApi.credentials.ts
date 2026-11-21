import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class OrvantaApi implements ICredentialType {
	name = 'orvantaApi';

	displayName = 'Orvanta API';

	icon: Icon = { light: 'file:orvanta.svg', dark: 'file:orvanta.dark.svg' };

	documentationUrl = 'https://orvantahq.io/how-it-works';

	properties: INodeProperties[] = [
		{
			displayName: 'Orvanta URL',
			name: 'url',
			type: 'string',
			default: 'https://app.orvantahq.io',
			placeholder: 'https://app.orvantahq.io',
			description: 'The address of your Orvanta app',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'An agent key (ahq_…, in My AI team → the agent) for one workflow, or the workspace key (ozk_…, Connections → Zapier) to cover every workflow: Report Activity then names the agent.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url.replace(/\\/+$/, "")}}',
			url: '/api/v1/config',
			method: 'GET',
		},
	};
}
