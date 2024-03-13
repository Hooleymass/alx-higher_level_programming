import { Suspense } from "react";
import Loading from "@/app/loading";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export default async function PostCard({ posts }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="card">
        {posts.map((post) => (
          <div className="card-res" key={post.uri}>
            <div className="card-start">
              <Link href={`/post/${post.uri}`}>
                <div className="image-container">
                  {post.featuredImage ? (
                    <Image
                      className="thumb"
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText}
                      width={500}
                      height={300}
                    />
                  ) : (
                    <div className="placeholder-image">
                      <Image
                        src={`https://placehold.co/600x400/000000/000FFF/png?text=kenyaplus`}
                        alt="Placeholder For Kenyaplus"
                        width={600}
                        height={400}
                      />
                    </div>
                  )}
                </div>
              </Link>
              <div className="card-content">
                <div className="category-tags">
                  {post.categories.nodes.length > 0 && (
                    <div className="categories">
                      {" "}
                      {post.categories.nodes.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                        >
                          <span className="category" key={category.slug}>
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {post.tags.nodes.length > 0 && (
                    <div className="tags">
                      {" "}
                      {post.tags.nodes.map((tag) => (
                        <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                          <span className="tag" key={tag.slug}>
                            #{tag.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-info">
                  <Link
                    key={post.author.node.slug}
                    href={`/author/${post.author.node.name}`}
                  >
                    <p className="hover:underline">{post.author.node.name}</p>
                  </Link>
                  <p className="hover:underline">{formatDate(post.date)}</p>
                  <p className="hover:underline">
                    {post.commentCount === null
                      ? "0 comments"
                      : post.commentCount === 1
                      ? "1 comment"
                      : `${post.commentCount} comments`}
                  </p>
                </div>
                <Link href={`/post${post.uri}`}>
                  <h3 className="hover:underline">
                    {post.title.length > 45
                      ? post.title.slice(0, 45) + "..."
                      : post.title}
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.slice(0, 200) + "...",
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
