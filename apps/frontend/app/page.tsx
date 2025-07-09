import React from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <h1 className='text-4xl font-bold'>Welcome to the website</h1>
      <Button className='mt-4'>Add Website</Button>
    </div>
  )
}

export default page