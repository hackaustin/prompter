import { error } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load(e: ServerLoadEvent) {
	const rq = await fetch('https://api.airtable.com/v0/appg9wvRrWyIpiRQN/Prompts', {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`
		}
	});
	let current = await rq.json();
	let ret = [];
	for (let rec of (current.records ?? [])) {
		ret.push(rec);
	}
	while (current.offset != undefined) {
		const nrq = await fetch(
			`https://api.airtable.com/v0/appg9wvRrWyIpiRQN/Prompts?offset=${current.offset}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`
				}
			}
		);

        current = await nrq.json();
        for (let rec of current.records) {
            ret.push(rec)
        }
	}
    return {
        records: ret
    }
}
