"use client"
import { useEffect } from 'react'
import {
  SignedIn,
  SignIn,
  useAuth,
} from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Navigation from '@/components/Navigation'
import { useUser } from '@clerk/nextjs';
import { useNotification, userClerkHandler, useServiceWorker, useWindowCaches } from '@/lib';
import Load from '@/components/Load'

export default () => {

  const { user, isSignedIn, isLoaded } = useUser();
  const { has }: { has: any } = useAuth()

  useEffect(() => {
    userClerkHandler(user)
    useNotification()
  }, []);


  if (!isLoaded) return <Load></Load>
  if (!isSignedIn) return <SignIn />

  const permission: {
    superAdmin: boolean
    admin: boolean
  } = {
    superAdmin: has({ permission: 'org:testpermission:soysuperadmin' }) && has({ permission: 'org:testpermission:soyadmin' }),
    admin: has({ permission: 'org:testpermission:soyadmin' })
  }

  return (
    <SignedIn>
      {
        permission.superAdmin ?
          <div className="min-h-screen">
            <Dashboard user={user} permission={permission} />
            <Navigation permission={permission} />
          </div>
          : <Load></Load>
      }
    </SignedIn>
  )
}