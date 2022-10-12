<h1>vote</h1>

<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData;
    let show = false;

    const vote = async (id: bigint) => {
        const rq = await fetch(`/api/vote?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id.toString()})
        })
        if (rq.status != 500) {
            alert("your vote has been submitted!")
        } else {
            alert("something went wrong while submitting your vote, please try again later")    
        }   
    }

    const login = async (e: SubmitEvent) => {
        const fd = new FormData(e.target as HTMLFormElement)
        const rq = await fetch(`/api/verify?email=${fd.get("email")}`)
        const validEmail = await rq.json()
        if(validEmail != true) {
            alert("It appears you haven't signed up yet for Hack Austin! (invalid email)")
            return;
        } else {
            alert("login success!")
            show = true;
        }  
    }
</script>

{#if show}
<ul>
    {#each data.records as r}
        <li id={`submission-${r.id}`}>{r.prompt} ({r.votes} ⬆️) | <button on:click={() => vote(r.id)}>vote for this one</button></li>
    {/each}
</ul>
{:else}
    <form on:submit|preventDefault={login}>
        <h2>registered users only: please login</h2>
        <p>email you used to register for hackaustin: </p>
        <input type="text" name="email" required id="email" placeholder="email"/>
        <button type="submit">login</button>
    </form>
{/if}