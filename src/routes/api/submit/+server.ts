import { error, invalid } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { PrismaClient, type Prompt, Prisma } from '@prisma/client'
import { NotFoundError } from '@prisma/client/runtime'
const prisma = new PrismaClient()


/** @type {import('../../../../.svelte-kit/types/src/routes/api/submit/$types').RequestHandler} */
export async function POST(e: RequestEvent){
    const j_data = await e.request.json()
    try {
        const author = prisma.participant.findFirstOrThrow({where: {email: {equals: j_data.email}}})
    } catch (e) {
        if (e instanceof NotFoundError) {
            invalid(400, {error: "user not found"})
        }
    }
    const pm = prisma.prompt.create({
        data: {
            prompt: j_data.prompt,
            authorEmail: j_data.email
        }
    })
    return new Response("ok")
}