<script lang="ts">
   const formSubmit = async (evt: SubmitEvent) => {
        const fd = new FormData(evt.target as HTMLFormElement)
        evt.preventDefault()
        const val = (document.getElementById("name") as HTMLInputElement)?.value;
        const rq = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: fd.get("prompt"), email: fd.get("email")})
        })
        if (rq.ok) alert("your prompt has been submitted!")
        else alert("something went wrong while submitting your prompt, please try again later")
   }
</script>

<h1>submit</h1>

<form on:submit={formSubmit}>
    <input type="text" name="prompt" required id="prompt" placeholder="prompt"/>
    <input type="email" name="email" required id="other" placeholder="email"/>
    <button type="submit">submit</button>
</form>