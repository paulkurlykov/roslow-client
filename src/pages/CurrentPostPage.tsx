import { useGetPostByIdQuery } from "@/app/services/postsApi";
import { useParams } from "react-router-dom";
import Card from "@/components/card";
import BackwardsButton from "@/components/backwards-button";
import CreateComment from "@/components/create-comments";
import { fakeImage } from "@/components/profile";

function CurrentPostPage() {
    const params = useParams<{ id: string }>();
    const { data } = useGetPostByIdQuery(params?.id || "");

    if (!data) {
        return <h2>Поста не существует</h2>;
    }

    console.log(data);

    const { content, id, authorId, likes, author, likedByUser, createdAt, comments } = data;

    return (
        <>
            <BackwardsButton />
            <Card
                cardFor="current-post"
                avatarUrl={author?.avatarUrl || ''}
                content={content}
                name={author.name || ""}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                likes={likes}
            />

            <CreateComment />

            <div className="mt-10">
                {data.comments
                    ? data.comments.map((comment) => (
                          <Card
                              cardFor="comment"
                              key={comment.id}
                              avatarUrl={author?.avatarUrl || ""}
                              content={comment.content}
                              name={comment?.user?.name || ""}
                              authorId={comment.userId}
                              commentId={comment.id}
                              id={id}
                          />
                      ))
                    : ""}
            </div>
        </>
    );
}

export default CurrentPostPage;
