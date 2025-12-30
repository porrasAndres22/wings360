"use client"
import { useEffect } from 'react'
import {
  SignedIn,
} from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Navigation from '@/components/Navigation'
import { useAuth, useUser } from '@clerk/nextjs';
import { useNotification, userClerkHandler, useServiceWorker, useWindowCaches } from '@/lib';
import Load from '@/components/Load'

export default () => {

  const { user, isSignedIn, isLoaded } = useUser();
  const { has }: { has: any } = useAuth()

  useEffect(() => {
    useServiceWorker('/sw.js')
    useWindowCaches()
    userClerkHandler(user)
    useNotification()
  }, []);


  if (!isLoaded) return <Load></Load>
  if (!isSignedIn) return <></>
  if (!has({ permission: 'org:testpermission:soysuperadmin' }) && !has({ permission: 'org:testpermission:soyadmin' })) return <></>

  return (
    <SignedIn>
      <div className="min-h-screen">
        <Dashboard user={user}></Dashboard>
        <Navigation />
      </div>
    </SignedIn>
  )
}