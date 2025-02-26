import { useCreatePostMutation, useLazyGetPostsQuery } from "@/app/services/postsApi";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@heroui/react";
import ErrorMessage from "../error-message";
import { Button } from "@heroui/react";
import { IoMdCreate } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useCreateCommentMutation } from "@/app/services/commentsApi";



type CommentFormData = {
    comment: string;
};

function CreateComment() {
    const {id} = useParams<{id: string}>();
    const [createComment] = useCreateCommentMutation();
    const [triggerGetPosts, { data, isLoading }] = useLazyGetPostsQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<CommentFormData>({});

    const onSubmit: SubmitHandler<CommentFormData> = async (formData: CommentFormData) => {
        try {
            await createComment({ content: formData.comment, postId: id });
            setValue("comment", "");
        } catch (err) {
            console.error("Exception " + err);
        }
    };

    const onError = async () => {
        console.log('error');
    }

    const error = errors?.comment?.message as string;

    return (
        <form className="flex-grow" onSubmit={handleSubmit(onSubmit, onError)}>
            <Controller
                name="comment"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="Черкани пару строк как коммент..."
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}

            <Button type="submit" color="success" className="flex-end" endContent={<IoMdCreate />}>
                Добавить комментарий
            </Button>
        </form>
    );
}

export default CreateComment;
