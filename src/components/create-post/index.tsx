import { useCreatePostMutation, useLazyGetPostsQuery } from "@/app/services/postsApi";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@heroui/react";
import ErrorMessage from "../error-message";
import { Button } from "@heroui/react";
import { IoMdCreate } from "react-icons/io";

type PostFormData = {
    post: string;
};

function CreatePost() {
    const [createPost] = useCreatePostMutation();
    const [triggerGetPosts, { data, isLoading }] = useLazyGetPostsQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<PostFormData>({});

    const onSubmit: SubmitHandler<PostFormData> = async (formData: PostFormData) => {
        console.log("onsubmit");
        try {
            console.log(formData);
            await createPost({ content: formData.post });
            setValue("post", "");
        } catch (err) {
            console.error("Exception " + err);
        }
    };

    const onError = async () => {
        console.log('error');
    }

    const error = errors?.post?.message as string;

    return (
        <form className="flex-grow" onSubmit={handleSubmit(onSubmit, onError)}>
            <Controller
                name="post"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="Черкани пару строк..."
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}

            <Button type="submit" color="success" className="flex-end" endContent={<IoMdCreate />}>
                Добавить пост
            </Button>
        </form>
    );
}

export default CreatePost;
