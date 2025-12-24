"use client"
import { useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Header from '@/components/Header'
import { useAuth, useUser } from '@clerk/nextjs';
import { userClerkHandler } from '@/lib';

export default () => {

  const { user, isSignedIn, isLoaded } = useUser();
  const { has }: { has: any } = useAuth()

  useEffect(() => {
    // Service Worker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/sw.js')
    }
    userClerkHandler(user)
  }, []);

  if (!isLoaded) return <>Loading...</>
  if (!isSignedIn) return <></>
  if (!has({ permission: 'org:testpermission:soyadmin' })) return <></>

  return (
    <div className="min-h-screen pb-8 text-black">
      <Header />
      <Dashboard user={user}></Dashboard>
    </div>
  )
}