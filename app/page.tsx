'use client'

import User from './components/User';
import {signOut, useSession} from "next-auth/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import {useEffect, useState} from "react";
import { UserNav } from "@/components/user-nav"

export default function Home() {
    const { data:session, status } = useSession();

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data)
            })
    }, [])

    if (status !== 'authenticated') {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You must be signed in to view this page.</p>
            </div>
        )
    }

  return (
      <>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                  <div>
                      <h2 className="text-2xl font-bold tracking-tight">Welcome back,!</h2>
                      <p className="text-muted-foreground">
                          Here&apos;s a list of users for you!
                      </p>
                  </div>
                  <div className="flex items-center space-x-2">
                      <UserNav />
                  </div>
              </div>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[100px]">No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {users.map((user, index) => (
                          <TableRow key={user.id}>
                              <TableCell className="font-medium">{ index+1 }</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                      <TableRow>
                          <TableCell colSpan={3}>Total of {users.length} user(s) rendered</TableCell>
                      </TableRow>
                  </TableFooter>
              </Table>
          </div>
      </>
  );
}