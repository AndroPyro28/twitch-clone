import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToggleCardSkeleton } from './_components/toggle-card'

const ChatLoading = () => {
  return (
    <div className='p-4 flex flex-col gap-3'>
      <Skeleton className='p-6 space-y-4 rounded-xl w-[200px] lg:w-[10%]' />
      <div className='space-y-4'>
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  )
}

export default ChatLoading
