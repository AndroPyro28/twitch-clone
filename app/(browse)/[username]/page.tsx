import React from 'react'

interface UserPageProps {
  params:{
    username: string;
  }
}
const UserPage:React.FC<UserPageProps> = ({params}) => {

  return (
    <div>
      User: {params.username}
    </div>
  )
}

export default UserPage
