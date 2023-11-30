import React from 'react'
import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

const getData = async (page, cat) => {
  // console.log("🚀 ~ file: CardList.jsx:7 ~ getData ~ cat:", cat)
  // console.log("🚀 ~ file: CardList.jsx:7 ~ getData ~ page:", page)
  let url
  if (process.env.VERCEL_URL !== undefined) {
    // url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    url = `https://${process.env.VERCEL_URL}`
  } else {
    url = 'http://localhost:3000'
  }



  console.log("🚀 ~ file: CardList.jsx:16 ~ getData ~ url:", `${url}/api/posts?page=${page}&cat=${cat || ""}`)
  const res = await fetch(`${url}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
      // next: { revalidate: 10 }
    }
  )

  if (!res.ok) {
    console.log("🚀 ~ file: CardList.jsx:20 ~ getData ~ res:", res)
    throw new Error("CardList getData failed")
  }

  console.log("🚀 ~ file: CardList.jsx:24 ~ getData ~ res:", res)

  return res.json()
}

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat)
  // console.log("🚀 ~ file: CardList.jsx:35 ~ CardList ~ posts:", posts)

  const POST_PER_PAGE = 2

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}


export default CardList