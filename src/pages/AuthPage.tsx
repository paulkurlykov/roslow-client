import { Key, useState } from "react";
import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import Login from "../features/login"
import Registration from "@/features/registration";

function AuthPage() {
    const [selected, setSelected] = useState('login');
    return (
        <div className="flex items-center justify-center h-screen" >
            <div className="flex flex-col" >
                <Card className="max-w-full w-[340px] h-[450px]" >
                    <CardBody>
                        <Tabs
                        fullWidth
                        size="md"
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        >
                            <Tab key="login" title="Вход" >
                                    <Login setSelected={setSelected} />
                            </Tab>,
                            <Tab key="sign-up" title="Регистрация" >
                                    <Registration setSelected={setSelected} />
                            </Tab>

                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default AuthPage
 