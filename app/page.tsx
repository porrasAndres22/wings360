
import {
  GoogleOneTap,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="fluentContent">
      <div className="formLogin form animate__animated animate__fadeIn">
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <GoogleOneTap />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </div>
  );
}
