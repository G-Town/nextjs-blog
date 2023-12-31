import React from 'react'
import styles from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'

const getData = async () => {
  let url
  if (process.env.VERCEL_URL !== undefined) {
    // url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    url = `https://${process.env.VERCEL_URL}`
  } else {
    url = 'http://localhost:3000'
  }
  const res = await fetch(`${url}/api/categories`, {
    cache: "no-store",
  })

  if (!res.ok) {
    // console.log("🚀 ~ file: CategoryList.jsx:18 ~ getData ~ res:", res)
    throw new Error("CategoryList getData failed")
  }

  // console.log("🚀 ~ file: CategoryList.jsx:22 ~ getData ~ res:", res)

  return res.json()
}

const CategoryList = async () => {
  const data = await getData()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList