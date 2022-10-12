import type { RequestEvent } from "@sveltejs/kit"
import { PrismaClient, type Participant, Prisma } from "@prisma/client"
import { NotFoundError } from "@prisma/client/runtime"
const prisma = new PrismaClient()

export async function GET(e: RequestEvent) {
    const email = e.url.searchParams.get("email") ?? "no email"
    try {
        const person = prisma.participant.findFirstOrThrow({where: {email: {equals: email}}})
        return new Response("true")
    } catch (e) {
        if (e instanceof NotFoundError) {
            return new Response("false")
        }
    }
}