import { isFollowingUser } from '@/lib/service/follow';
import { getUserByUsername } from '@/lib/service/user';
import { notFound } from 'next/navigation';
import React from 'react'
import { Actions } from './_components/actions';
import { isBlocking } from '@/lib/service/block';
interface UserPageProps {
  params:{
    username: string;
  }
}
const UserPage:React.FC<UserPageProps> = async ({params}) => {
  const user = await getUserByUsername(params.username);

  if(!user) {
    notFound()
  }

  // will check if the user block each other
  const isBlock = await isBlocking(user.id);
  
  if(isBlock) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id);
  
  return (
    <div className='flex flex-col gap-y-4 px-5'>
      <p>
        ID: {user.id}
      </p> 
      <p>
        username: {user.username}
      </p> 
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}

export default UserPage
