import { getAuthSession } from '@/utils/auth'
import prisma from '@/utils/connect'
import { NextResponse } from 'next/server'

// GET ALL POSTS
export const GET = async (req) => {
  console.log("🚀 ~ file: route.js:23 ~ GET ~ req:", req)
  const { searchParams } = new URL(req.url)
  console.log("🚀 ~ file: route.js:9 ~ GET ~ req.url:", req.url)
  console.log("🚀 ~ file: route.js:24 ~ GET ~ searchParams:", searchParams)

  const page = searchParams.get("page")
  // console.log("🚀 ~ file: route.js:9 ~ GET ~ page:", page)
  const cat = searchParams.get("cat")
  // console.log("🚀 ~ file: route.js:11 ~ GET ~ cat:", cat)

  const POST_PER_PAGE = 2

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  }

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where })
    ])
    console.log("🚀 ~ file: route.js:46 ~ GET ~ posts:", posts)

    // const posts = await prisma.post.findMany({
    //   take: POST_PER_PAGE,
    //   skip: POST_PER_PAGE * (page - 1),
    // })

    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    )
  }
}


// CREATE A POST
export const POST = async (req) => {
  // const session = await getAuthSession()
  const session = "unauthenticated"

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    )
  }

  try {
    const body = await req.json()
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    })

    return new NextResponse(JSON.stringify(post, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    )
  }
}