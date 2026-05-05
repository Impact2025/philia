import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;

  const skip = (page - 1) * limit;

  const where = {
    ...(category ? { category: { slug: category } } : {}),
    ...(status ? { status } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(request: NextRequest) {
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

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status: status || "draft",
      categoryId: categoryId || null,
      tags,
      metaTitle,
      metaDescription,
      publishedAt: status === "published" ? new Date() : null,
    },
    include: { category: true },
  });

  return NextResponse.json(post, { status: 201 });
}
