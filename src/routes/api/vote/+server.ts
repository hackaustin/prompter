// import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { PrismaClient, type Prompt, Prisma } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
const prisma = new PrismaClient();

/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent) {
	const j_data = await e.request.json();

	const id = BigInt(j_data.id) as bigint;

	const pr = await prisma.prompt.findFirst({ where: { id: id } });

	let cv;

	if (pr?.votes == undefined) {
		cv = 0;
	} else {
		cv = pr.votes;
	}

    cv += 1

	prisma.prompt.update({
		where: {
			id: id
		},
		data: {
			votes: cv 
		}
	});

	return new Response('ok');
}
