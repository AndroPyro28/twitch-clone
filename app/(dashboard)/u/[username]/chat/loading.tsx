import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToggleCardSkeleton } from './_components/toggle-card'

const ChatLoading = () => {
  return (
    <div>
      <Skeleton className='p-6 space-y-4' />
      <div className='space-y-4'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default ChatLoading
