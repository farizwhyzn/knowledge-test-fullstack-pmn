'use client'

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from './components/User';
import {signOut, useSession} from "next-auth/react";

export default function Home() {
    const { data:session } = useSession();
  return (
      <section>
        <h1>Home</h1>
        <p>Welcome to the home page.</p>
          <p>Hi {session?.user?.email}</p>
          <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>Sign Out</button>
            <User />
      </section>
  );
}
