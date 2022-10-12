import { error, invalid } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PrismaClient, type Prompt, Prisma } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
const prisma = new PrismaClient();

/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent) {
	const j_data = await e.request.json();
	let pr;
	try {
		pr = await prisma.prompt.findFirstOrThrow({ where: { id: { equals: j_data.id } } });
	} catch (e) {
		if (e instanceof NotFoundError) {
			invalid(400, { error: 'prompt not found' });
		}
	}
    
    const currVotes = pr?.votes ?? invalid(500, {error: "idk something happened"})

    prisma.prompt.update({
        where: {
            id: j_data.id as number
        },
        data: {
            votes: currVotes + 1
        }
    })

    return new Response("ok")

}
