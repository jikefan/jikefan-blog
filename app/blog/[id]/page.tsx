export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the content of the blog post with id {id}</p>
    </div>
  );
}