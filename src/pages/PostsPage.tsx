import { useGetPostsQuery } from "@/app/services/postsApi"
import { useGetUserByIdQuery } from "@/app/services/userApi";
import Card from "@/components/card";
import CreatePost from "@/components/create-post";
import { fakeImage } from "@/components/profile";



function PostsPage() {

    const { data } = useGetPostsQuery();

    if(!data) return null;

    console.log(
        data
    );

    return (
        <>
        <div className="mb-10 w-full" >
            <CreatePost/>
            
        </div>
        {data && data.length > 0 ? data.map(({content, authorId, id, author, comments, likes, likedByUser, createdAt}) => (
            <Card
            avatarUrl={author?.avatarUrl || ""}
            key={id}
            content={content}
            name={author.name ?? ""}
            likesCount={likes.length}
            commentsCount={comments.length}
            authorId={authorId}
            id={id}
            likedByUser={likedByUser}
            createdAt={createdAt}
            cardFor="post"
            likes={likes}

            />
        )) : ""}
        </>

        

    )
}

export default PostsPage
