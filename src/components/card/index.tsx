import { getCurrentUser } from "@/app/reducers/userSlice";
import { useDeleteCommentMutation } from "@/app/services/commentsApi";
import { useLikePostMutation, useUnlikePostMutation } from "@/app/services/likesApi";
import {
    useDeletePostMutation,
    useLazyGetPostByIdQuery,
    useLazyGetPostsQuery,
} from "@/app/services/postsApi";
import { Card as NextUICard, CardHeader, Spinner, CardBody, CardFooter } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "../user";
import { formatToClientDate } from "@/utils/format-to-client.date";
import { MdDeleteForever } from "react-icons/md";
import Typography from "../Typography";
import MetaInfo from "../meta-info";
import { IoHeart, IoHeartDislikeSharp } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import ErrorMessage from "../error-message";
import { hasErrorField } from "@/utils/has-error-field";
import { Like } from "@/app/types";
import { current } from "@reduxjs/toolkit";
import { AiFillDelete } from "react-icons/ai";
import { useGetUserByIdQuery } from "@/app/services/userApi";

type CardProps = {
    avatarUrl: string;
    name: string;
    authorId: string;
    content: string;
    commentId?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date | null;
    id?: string;
    cardFor: "comment" | "post" | "current-post";
    likedByUser?: boolean;
    likes?: Like[];
};

function Card({
    avatarUrl,
    likes,
    name = "",
    authorId = "",
    likesCount = 0,
    content,
    commentsCount = 0,
    createdAt = null,
    id = "",
    cardFor = "post",
    likedByUser = false,
    commentId,
}: CardProps) {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const currentUser = useSelector(getCurrentUser);

    const isYoulikedThisPost =
        likes && likes.length > 0 && likes.some((like) => like.userId === currentUser?.id);

    // console.log("likes: ", likesCount);
    // console.log("comments: ", commentsCount);

    const handleDelete = async () => {
        try {
            switch (cardFor) {
                case "post":
                    await deletePost(id).unwrap();
                    break;
                case "current-post":
                    await deletePost(id).unwrap();
                    navigate("/");
                    break;
                case "comment":
                    await deleteComment(commentId as string).unwrap();
                    break;
                default:
                    throw new Error("Неверный аргумент cardFor");
            }
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.message);
            } else {
                setError(err as string);
            }
        }
    };

    const handleClick = async () => {
        try {
            isYoulikedThisPost ? await unlikePost(id) : await likePost({ postId: id });
        } catch (err) {
            console.error("Exception " + err);
        }
    };

    return (
        <NextUICard className="mb-5">
            <CardHeader className="justify-between items-center bg-transparent">
                <Link to={`/user/${authorId}`}>
                    <User
                        name={name}
                        avatarUrl={avatarUrl}
                        description={(createdAt && formatToClientDate(createdAt)) || ""}
                        className="text-small font-semibold leading-none text-default-600"
                    />
                </Link>
                {cardFor === "comment" && authorId === currentUser?.id && (
                    <div onClick={handleDelete} className="cursor-pointer w-[20px] h-[20px]">
                        {deleteCommentStatus.isLoading || deletePostStatus.isLoading ? (
                            <Spinner />
                        ) : (
                            <AiFillDelete className="text-red-600/80 w-full h-full " />
                        )}
                    </div>
                )}
            </CardHeader>

            <CardBody className="px-3 py-2 mb-5">
                <Typography>{content}</Typography>
            </CardBody>

            {cardFor !== "comment" && (
                <CardFooter className="flex justify-between">
                    <div className="flex gap-5 items-center">
                        <div onClick={handleClick}>
                            <MetaInfo count={likesCount}>
                                {isYoulikedThisPost ? (
                                    <IoHeartDislikeSharp className="text-red-600/80" />
                                ) : (
                                    <IoHeart />
                                )}
                            </MetaInfo>
                        </div>
                        <Link to={`/posts/${id}`}>
                            <MetaInfo count={commentsCount}>{<FaRegCommentDots />}</MetaInfo>
                        </Link>
                    </div>

                    <ErrorMessage error={error} />

                    {authorId === currentUser?.id && (
                        <div onClick={handleDelete} className="cursor-pointer w-[20px] h-[20px]">
                            {deleteCommentStatus.isLoading || deletePostStatus.isLoading ? (
                                <Spinner />
                            ) : (
                                <AiFillDelete className="text-red-600/80 w-full h-full " />
                            )}
                        </div>
                    )}
                </CardFooter>
            )}
        </NextUICard>
    );
}

export default Card;
