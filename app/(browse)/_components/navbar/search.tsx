"use client"

import React from 'react'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Search = () => {
  return (
    <form className="relative w-full lg:w-[400px]">
      <Input
        placeholder="Search"
        type="text"
      />
      <Button>
        <SearchIcon size={24} />
      </Button>
      search
    </form>
  )
}

