import Menu from '@/components/menu/Menu'
import styles from './singlePage.module.css'
import Image from 'next/image'
import Comments from '@/components/comments/Comments'

const getData = async (slug) => {
  let url
  if (process.env.VERCEL_URL !== undefined) {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  } else {
    url = 'http://localhost:3000'
  }
  console.log("🚀 ~ file: page.jsx:12 ~ getData ~ url:", url)
  const res = await fetch(`${url}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("🚀 ~ file: page.jsx:19 ~ getData ~ res:", res)
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  console.log("🚀 ~ file: page.jsx:22 ~ SinglePage ~ data:", data)

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill sizes="auto" className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image placeholder="blur" blurDataURL={data.img} src={data.img} alt="" fill sizes="auto" className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;