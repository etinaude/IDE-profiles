<script>
	import { page } from '$app/stores';

	const studentName = $page.params.name;
</script>

<h1>Student Profile</h1>
<p>Student Name: {studentName}</p>

<style>
	h1 {
		color: blue;
	}
</style>
