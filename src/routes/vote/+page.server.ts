import type { ServerLoadEvent } from '@sveltejs/kit'
import { Prisma, PrismaClient, type Prompt } from '@prisma/client'

const prisma = new PrismaClient()
/** @type {import('./$types').PageServerLoad} */
export async function load(_e: ServerLoadEvent) {
    const recs = await prisma.prompt.findMany()
    return { records: recs }
}