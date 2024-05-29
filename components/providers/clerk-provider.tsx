import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

interface IClerkProviderProps {
  children: React.ReactNode
}

const ClerkWrapper:React.FC<IClerkProviderProps> = ({children}) => {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
        {children}
    </ClerkProvider>
  )
}

export default ClerkWrapper
