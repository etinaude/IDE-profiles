<script lang="ts">
	import { page } from '$app/stores';
	import { app, db } from '$lib/firebase';
	import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import type { Profile, Project, SocialMediaLink } from '$lib/types';

	const id = $page.params.name;
	let profile: Profile;
	let projects: Project[] = [];
	let socialLinks: SocialMediaLink[] = [];

	async function fetchProfile() {
		const profileSnap = await getDoc(doc(db, 'profiles', id));

		if (!profileSnap.exists()) {
			console.log('No such Profile!');
			return;
		}

		profile = profileSnap.data() as Profile;

		const projectsSnap = await getDocs(collection(db, `profiles/${id}/projects`));
		projectsSnap.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			projects.push(doc.data() as Project);
		});

		const socialLinksSnap = await getDocs(collection(db, `profiles/${id}/socialMediaLinks`));
		socialLinksSnap.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			socialLinks.push(doc.data() as SocialMediaLink);
		});

		console.log('Profile fetched:', profile);
		console.log('Projects fetched:', projects);
		console.log('Social Links fetched:', socialLinks);
		projects = [...projects];
		socialLinks = [...socialLinks];
	}

	onMount(() => {
		fetchProfile();
	});
</script>

<div class="page">
	{#if profile}
		<h1>{profile.firstName} {profile.lastName}</h1>

		<h2>{profile.headline}</h2>
		<hr />

		<br />
		<br />
		<div class="row">
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
		</div>

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
	{:else}
		<p>Loading profile...</p>
	{/if}
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
</style>
