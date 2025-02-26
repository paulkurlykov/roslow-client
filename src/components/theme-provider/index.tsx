import { ReactNode, useState, createContext, useContext } from "react"

type ThemeContextType = {
    theme: "dark" | "light",
    toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => null
})






export const ThemeProvider = ({children}: {children: ReactNode}) => {
const storedTheme = localStorage.getItem("theme");
const currentTheme = storedTheme ? storedTheme as "dark" | "light" : "dark";

const [theme, setTheme] = useState(currentTheme);

const toggleTheme = () => {

    setTheme(prevTheme => {
        const newTheme = prevTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        return newTheme;
    });
}

return (
    <ThemeContext.Provider value={{theme, toggleTheme}} >
        <main className={`${theme} text-foreground bg-background `} >
{children}
        </main>

    </ThemeContext.Provider>
)
}

