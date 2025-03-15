"use client"
import { useTheme } from "../hook/theme";
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const selectTheme = useTheme();
    return (
        <div className="theme-toggle">
            <button className="theme-toggle__button"
                onClick={() => selectTheme(true)}>
                <MoonIcon />
                <SunIcon />
            </button>
        </div>
    )
}

export default ThemeToggle;