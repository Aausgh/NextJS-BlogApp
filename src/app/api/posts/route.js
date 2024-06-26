import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server'

export const GET = async () => {

    try {
        const posts = await prisma.post.findMany()

        return new NextResponse(JSON.stringify({ posts }, { status: 200 }));
    } catch (err) {
        console.error("Error in GET request:", err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};



// CREATE A POST
export const POST = async (req) => {
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        const post = await prisma.post.create({
            data: {
                ...body,
                userEmail: session.user.email,
                catSlug: body.catSlug,
            },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};