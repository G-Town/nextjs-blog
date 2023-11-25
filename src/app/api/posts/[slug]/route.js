// import { getAuthSession } from '@/utils/auth'
import prisma from '@/utils/connect'
import { NextResponse } from 'next/server'

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      // TODO: add view count to posts
      // data: { views: { increment: 1 } },
      include: { user: true }
    })

    // const posts = await prisma.post.findMany({
    //   take: POST_PER_PAGE,
    //   skip: POST_PER_PAGE * (page - 1),
    // })

    return new NextResponse(JSON.stringify(post, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    )
  }
}