"use client"
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import React, { PropsWithChildren } from 'react'

interface WrapperProps {
    children:  React.ReactNode
}

export const Wrapper:React.FC<PropsWithChildren> = ({children}) => {
  // fetch followed users
  const {collapsed} = useSidebar((state)  =>  state)
  return (
    <aside className= {cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r bordfer-[#2D2E35] z-50', collapsed && 'w-[70px]')} >
        {children}
    </aside>
  )
}
