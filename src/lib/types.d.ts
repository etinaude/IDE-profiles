export interface Project {
	id: string;
	title: string;
	description: string;
	date: string;
	media: string[];
	url?: string;
	module: string;
	tags?: string[];
}

export interface SocialMediaLink {
	platform: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Portfolio' | string; // Can be a predefined platform or a custom string
	url: string;
	icon?: string;
}

export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	headline?: string;
	year: number;
	bio?: string;
	profilePictureUrl?: string;
	tags?: string[];
}
