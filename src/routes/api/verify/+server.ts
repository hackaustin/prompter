import type { RequestEvent } from "@sveltejs/kit"
import { PrismaClient, type Participant, Prisma } from "@prisma/client"
import { NotFoundError } from "@prisma/client/runtime"
const prisma = new PrismaClient()

export async function GET(e: RequestEvent) {
    const email = e.url.searchParams.get("email") ?? "no email"
    const person = await prisma.participant.findFirst({where: {email: {equals: email}}})
    if (person) {
        return new Response("true")
    } else {
        return new Response("false")
    }
}