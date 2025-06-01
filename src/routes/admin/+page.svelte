<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Profile, Project, SocialMediaLink } from '$lib/types';

	const id = $page.params.name;
	let projects: Project[] = [];
	let socialLinks: SocialMediaLink[] = [];

	let firstName = '';
	let lastName = '';
	let headline = '';
</script>

<div class="page">
	<h1>
		<input bind:value={firstName} placeholder="first name" />
		<input bind:value={lastName} placeholder="last name" />
	</h1>

	<h2><input bind:value={headline} placeholder="headline" /></h2>
	<hr />

	<br />
	<br />
	<!-- <div class="row">
		<div class="column third">
			<div class="profile-img">
				<img src={profile.profilePictureUrl} alt="Avatar" />
			</div>

			<h3>Links</h3>
			<div class="socials-links">
				{#each socialLinks as link}
					<div class="social-link">
						<a href={link.url} target="_blank" rel="noopener noreferrer">
							{link.platform}
						</a>
					</div>
				{/each}
			</div>
		</div>

		<div class="column two-third">
			<p>{profile.bio}</p>
		</div>
	</div> -->

	<hr />

	<div class="projects">
		{#each projects as project}
			<div class="social-link">
				<a href={project.url} target="_blank" rel="noopener noreferrer">
					<div class="row">
						<div class="column third">
							<h2>{project.title}</h2>
							<p>{project.description}</p>
						</div>
						<div class="column project-image two-third">
							<img src={project.media[0]} alt="Avatar" />
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.profile-img {
		img {
			width: 200px;
			// border-radius: 20px;
		}
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 20px;
		justify-content: space-between;
	}

	.column {
		display: flex;
		flex-direction: column;
		width: 50%;

		&.third {
			width: 30%;
		}

		&.two-third {
			width: 60%;
		}
	}

	.page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.project-image {
		img {
			width: 100%;
			border-radius: 10px;
		}
	}

	h1 input {
		width: 200px;
		margin-right: 10px;
		font-size: 30px;
	}

	h2 input {
		width: 200px;
		margin-right: 10px;
		font-size: 20px;
	}
</style>
