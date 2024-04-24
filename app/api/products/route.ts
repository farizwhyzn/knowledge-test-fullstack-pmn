import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

// export async function GET() {
//     const products = await prisma.product.findMany();
//
//     return NextResponse.json(products)
// }

export async function POST(req) {
    const body = await req.json();
    const { name, description, stock, email } = body;

    if (!name || !stock) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            stock: parseInt(stock),
            user: {
                connect: { email: email },
            },
        }
    });
    return NextResponse.json(product)
}