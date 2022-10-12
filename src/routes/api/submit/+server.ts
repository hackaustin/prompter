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
        prisma.prompt.create({data: {
            authorEmail: j_data.email,
            prompt: j_data.prompt 
        }})
    } catch (e) {
        return error(500, "didnt work lmao")
    }
    return new Response("ok")
}