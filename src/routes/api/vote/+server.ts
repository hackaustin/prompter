import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent){
    const apiURL = `https://api.airtable.com/v0/appg9wvRrWyIpiRQN/Prompts/${e.url.searchParams.get("id")}` 
    const recordReq = await fetch(apiURL, {
        headers: {
            'Authorization': `Bearer ${env['AIRTABLE_API_KEY']}`,
            'Content-Type': 'application/json'
        },
    })
    const rec = await recordReq.json();
    let votes = rec.fields.Votes + 1;
    const updateReq = await fetch(apiURL, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${env['AIRTABLE_API_KEY']}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Votes: votes
            }
        })
    })
    if (updateReq.ok) {
        return new Response("ok")
    } else {
        return new Response(error(500, "something went wrong"))
    }
}