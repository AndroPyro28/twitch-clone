import { StreamPlayer } from '@/components/stream-player'
import { getUserByUsername } from '@/lib/service/user'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

interface CreatorPageProps {
  params: {
    username:string
  }
}
const CreatorPage:React.FC<CreatorPageProps> = async ({params}) => {

  const externalUser = await currentUser()
  const user = await getUserByUsername(params.username)


  if(!user || user.externalUserId !== externalUser?.id|| !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className='h-full '>
      <StreamPlayer
        isFollowing={true}
        user={user}
        stream={user.stream}
      />
    </div>
  )
}

export default CreatorPage
