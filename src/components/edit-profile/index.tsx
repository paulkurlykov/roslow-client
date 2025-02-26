import { useUpdateUserMutation } from "@/app/services/userApi";
import { User } from "@/app/types";
import { useState, useContext } from "react";
import { ThemeContext } from "../theme-provider";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, Textarea, ModalFooter } from "@heroui/react";
import Input from "../input.tsx";
import { MdOutlineEmail } from "react-icons/md";
import ErrorMessage from "../error-message";
import { Button } from "@heroui/react";
import { ChangeEventHandler, ChangeEvent } from "react";
import { hasErrorField } from "@/utils/has-error-field";
import { register } from "module";
import { IoClose } from "react-icons/io5";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user?: User;
};

function EditProfile({ isOpen, onClose, user }: Props) {
    const { theme } = useContext(ThemeContext);
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [error, SetError] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { id } = useParams<{ id: string }>();

    const { handleSubmit, control, register } = useForm<EditUser>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: user?.email,
            name: user?.name,
            dateOfBirth: user?.dateOfBirth,
            bio: user?.bio,
            location: user?.location,
        },
    });

    type EditUser = Omit<User, "avatatUrl"> & {
        avatarUrl: File | null;
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onSubmit = async (data: EditUser) => {
        if (id) {
            try {
                const formData = new FormData();
                data.name && formData.append("name", data.name);
                data.email && data.email !== user?.email && formData.append("email", data.email);
                data.dateOfBirth &&
                    formData.append("dateOfBirth", new Date(data.dateOfBirth).toISOString());
                data.bio && formData.append("bio", data.bio);
                data.location && formData.append("location", data.location);
                data?.avatarUrl[0] && formData.append("avatar", data?.avatarUrl[0])
                await updateUser({ userData: formData, id });
                onClose();
            } catch (err) {
                if (hasErrorField(err)) {
                    SetError(err?.data?.message);
                    
                }
            }
        }
    };

    return (
        <Modal
            backdrop="opaque"
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                closeButton: "scale-110",
            }}
            scrollBehavior="inside"
            isOpen={isOpen}
            onClose={onClose}
            className={`${theme} text-foreground`}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <span>Изменение профиля</span>
                        </ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    control={control}
                                    name="email"
                                    label="Email"
                                    type="email"
                                    endContent={<MdOutlineEmail />}
                                />

                                <Input
                                    control={control}
                                    name="name"
                                    label="Имя"
                                    type="text"
                                    endContent={<MdOutlineEmail />}
                                />

                                <input
                                    {...register("avatarUrl")}
                                    type="file"
                                    accept="image/*, .png, .jpg, .gif, .web"
                                    name="avatarUrl"
                                    placeholder="Загрузить файл"
                                    onChange={(event) => handleFileChange(event)}
                                />

                                <Input
                                    control={control}
                                    name="dateOfBirth"
                                    label="Дата рождения"
                                    type="date"
                                    placeholder="Дата рождения"
                                    endContent={<MdOutlineEmail />}
                                />

                                <Controller
                                    name="bio"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            value={field.value || ""}
                                            rows={4}
                                            placeholder="Расскажите о себе"
                                        />
                                    )}
                                />

                                <Input
                                    control={control}
                                    name="location"
                                    label="Где ты живешь"
                                    type="text"
                                    endContent={<MdOutlineEmail />}
                                />

                                <ErrorMessage error={error} />
                                <div className="flex gap-8 justify-end">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Закрыть
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isLoading={isLoading}>
                                        Обновить профиль
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditProfile;
