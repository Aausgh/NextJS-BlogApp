import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

// GET SINGLE POST
export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const post = await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true },
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};

//UPDATE A POST
export const PUT = async (req, { params }) => {
    const { slug } = params;

    const session = await getAuthSession(req);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        const post = await prisma.post.update({
            where: { slug },
            data: {
                ...body,
            }
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}


//DELETE A POST
export const DELETE = async (req, { params }) => {
    const { slug } = params;

    const session = await getAuthSession(req);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        );
    }

    try {

        const post = await prisma.post.delete({
            where: { slug }
        });

        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
};