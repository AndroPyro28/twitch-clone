import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


const receiver = new  WebhookReceiver(process.env.LIVEKIT_API_KEY!,  process.env.LIVEKIT_API_SECRET!)

export const POST = async (req:Request) => {
    const body = await req.text()
    const headerPayload = headers()
    const authorization =  headerPayload.get("Authorization")

    if (!authorization) {
        return new Response("No authorization header", {status:400})
    }

    const e = receiver.receive(body, authorization)

    if (e.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: e.ingressInfo?.ingressId
            },
            data: {
                isLive:true
            }
        })
    }
    if (e.event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: e.ingressInfo?.ingressId
            },
            data: {
                isLive:false
            }
        })
    }

    return NextResponse.json({message:  "Ok"}, {status:200})
}



  