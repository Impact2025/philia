import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    status,
    categoryId,
    tags,
    metaTitle,
    metaDescription,
  } = body;

  const existingPost = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status,
      categoryId: categoryId || null,
      tags,
      metaTitle,
      metaDescription,
      publishedAt:
        status === "published" && !existingPost.publishedAt
          ? new Date()
          : existingPost.publishedAt,
    },
    include: { category: true },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
