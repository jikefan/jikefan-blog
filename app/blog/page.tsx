"use server";

import { useCreatePost } from "@/features/blog/api/create-blog";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Blog() {
    // const createBlog = useCreatePost();

    // 从session中获取登录信息
    const session = await auth();

    // const clickHandler = async () => {
    //     // 创建博客
    //     await createBlog.runAsync({
    //         title: "hello world",
    //         content: "hello world",
    //         authorId: 1,
    //         published: false,
    //     });
    // }

    return (
        <>
            <div>
                {session?.user ? (
                    <p>{JSON.stringify(session.user)}</p>
                ) : (
                    <p>未登录</p>
                )}
            </div>
            <ul>
                <li>
                    <Link href="/blog/1">blog1</Link>
                    <Link href="/blog/2">blog2</Link>
                </li>
            </ul>
            <br />
            <div>
                {/* <button onClick={clickHandler}>创建博客</button> */}
            </div>
        </>
    )
}