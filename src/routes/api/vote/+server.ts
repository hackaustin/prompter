import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent){
    const recordReq = await fetch(`https://api.airtable.com/v0/appg9wvRrWyIpiRQN/Prompts/${e.url.searchParams.get("id")}`, {
        headers: {
            'Authorization': `Bearer ${env['AIRTABLE_API_KEY']}`,
            'Content-Type': 'application/json'
        },
    })
    const rec = await recordReq.json();
}