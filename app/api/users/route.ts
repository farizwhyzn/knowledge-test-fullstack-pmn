import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from "next/server";

export async function GET() {

    const users = await prisma.user.findMany({});

    return NextResponse.json(users)
}