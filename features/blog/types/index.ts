import {z} from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1, "长度不能少于一个字符"),
    content: z.string().min(1, "长度不能少于一个字符"),
    published: z.boolean().default(false),
    authorId: z.number(),
})

export type CreatePostDTO = z.infer<typeof createPostSchema>;