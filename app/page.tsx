import {
  SignInButton,
  SignedOut,
} from '@clerk/nextjs'

import User from '@/components/User'

export default () => {

  return (
    <div className="fluentContent">
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <User></User>
      </header>
    </div>
  )
}