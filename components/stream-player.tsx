import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'
import React from 'react'

interface StreamPlayerProps {
    user:User & {stream: Stream | null}
    stream:Stream
    isFollowing:boolean
}
export const StreamPlayer:React.FC<StreamPlayerProps> = ({user, stream, isFollowing}) => {

  const {identity, name, token} = useViewerToken(user.id)

  if(!token || !name || !identity) {
    <div className="">Cannot watch the stream</div>
  }
  return (
    <div>
      Allowed to watch the stream
    </div>
  )
}