'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useEffect, useState} from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import {toast} from "sonner";



export default function Login() {
    const router = useRouter();
    const session = useSession();
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    })

    const loginUser = async (e) => {
        e.preventDefault()
        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                if (callback?.error) {
                    toast.error(callback.error)
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged in successfully")
                }
            })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={loginUser}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={data.email}
                                    onChange={e => setData({...data, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData({...data, password: e.target.value})}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button onClick={() => signIn('google')} variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="#" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
