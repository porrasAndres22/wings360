"use client"
import { useEffect } from 'react'
import {
  SignedIn,
} from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Navigation from '@/components/Navigation'
import { useAuth, useUser } from '@clerk/nextjs';
import { userClerkHandler, useServiceWorker } from '@/lib';

export default () => {

  const { user, isSignedIn, isLoaded } = useUser();
  const { has }: { has: any } = useAuth()

  useEffect(() => {
    useServiceWorker('/sw.js')
    userClerkHandler(user)
  }, []);


  if (!isLoaded) return <div className="loader"></div>
  if (!isSignedIn) return <></>
  if (!has({ permission: 'org:testpermission:soysuperadmin' }) && !has({ permission: 'org:testpermission:soyadmin' })) return <></>

  return (
    <SignedIn>
      <div className="min-h-screen pb-8 text-black">
        <Dashboard user={user}></Dashboard>
        <Navigation />
      </div>
    </SignedIn>
  )
}