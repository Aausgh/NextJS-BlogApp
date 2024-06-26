import styles from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'


const getCat = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed")
    }

    return res.json()
}

const CategoryList = async () => {

    const data = await getCat()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>

            <div className={styles.categories}>
                {data?.map((cat) => (
                    <Link
                        href={`/category-page?cat=${cat.slug}`}
                        className={`${styles.category} ${styles[cat.slug]}`}
                        key={cat.id}
                    >
                        {cat.img && (
                            <Image
                                src={cat.img}
                                alt=""
                                width={32}
                                height={32}
                                className={styles.image}
                            />
                        )}
                        {cat.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList