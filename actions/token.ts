"use server"

import {v4} from "uuid"
import { AccessToken } from "livekit-server-sdk"
import { getCurrentUser } from "@/lib/service/auth"
import { getUserById } from "@/lib/service/user"
import { isBlocking } from "@/lib/service/block"
import { root } from "postcss"

export const createViewerToken = async (hostIdentity:string) => {
    let self;

    try {
        self = await getCurrentUser();
    } catch (error) {
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = {id, username}
    }

    const host = await getUserById(hostIdentity);

    if(!host) {
        throw new Error("user not found")
    }
    const isBlocked =  await isBlocking(host.id)

    if(isBlocked) {
        throw new Error("Cannot find user")
    }

    const isHost = self.id === host.id;

    const token = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
        identity: isHost ? `host-${self.id}` : self.id,
        name: self.username
    })

    token.addGrant({
        room:host.id,
        roomJoin:true,
        canPublish:false,
        canPublishData: true
    })

    return await Promise.resolve(token.toJwt())
}