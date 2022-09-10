import {error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent){
    const data = await e.request.json()
    const postBody = {
        fields: { Prompt: data.prompt, Email: data.email }
    } 
    const req = await fetch('https://api.airtable.com/v0/appg9wvRrWyIpiRQN/Prompts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    })
    if (req.ok) {
        return new Response("ok")
    } else {
        const t = await req.text()
        console.log(t)
        return new Response(error(500, `something went wrong ${t}`))
    }
    return new Response("most likely ok")
}