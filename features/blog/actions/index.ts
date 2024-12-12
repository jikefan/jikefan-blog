"use server";

import { prisma } from "@/lib/prisma";
import { CreatePostDTO, createPostSchema } from "../types";

export const createPost = async (params: CreatePostDTO) => {
    const result = await createPostSchema.safeParseAsync(params);
    if (!result.success) {
        const error = result.error.format()._errors?.join(";");
        throw new Error(error);
    }

    await prisma.post.create({
        data: result.data,
    })
}