import { NextPage } from "next"
import { Fragment } from "react"
import Head from "next/head"
import * as fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Image from "next/image"
import { useRouter } from "next/router"
import PageLayouts from "@layouts/PageLayouts"

const DetailPost: NextPage = ({ frontMatter, mdxSource }: any) => {
    const { title, category, description, author, cover } = frontMatter
    const router = useRouter()
    return (
        <Fragment>
            <Head>
                <title>MDX - {title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-24 py-10">
                <PageLayouts>
                    <div className="mt-8 relative w-full h-[240px] md:h-[320px]">
                        <Image src={cover} style={{ borderRadius: "32px" }} objectFit="cover" layout="fill" alt={title} />
                    </div>
                    <h3 className="font-gilroy-bold py-3 px-8 bg-primary-hover text-neutral-10 rounded-2xl mt-8 w-fit">{category}</h3>
                    <h1 className="font-gilroy-bold text-4xl text-primary-pressed mt-3 mb-5">{title}</h1>
                    <h5>{description}</h5>
                    <p>{author}</p>
                    <h2 onClick={() => router.back()} className="font-gilroy-bold py-3 px-10 rounded-2xl hover:cursor-pointer text-xl text-primary-pressed fixed bottom-5 left-5 bg-neutral-10">Back</h2>
                    <MDXRemote {...mdxSource} />
                </PageLayouts>
            </div>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("md", "posts"))

    const paths = files.map((filename: any) => ({
        params: {
            postId: filename.replace(".mdx", "")
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const { postId } = context.params

    const markdownWithMeta = fs.readFileSync(path.join("md", "posts", postId + ".mdx"), "utf-8")
    const { data: frontMatter, content } = matter(markdownWithMeta)

    const mdxSource = await serialize(content)

    return {
        props: {
            frontMatter,
            mdxSource,
            postId
        }
    }
}

export default DetailPost