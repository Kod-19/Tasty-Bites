import { MoonIcon, Sun } from 'lucide-react';
import React, {useEffect, useState} from 'react'

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem('theme') === 'dark'
    )

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);
  return (
    <div 
        className='' 
        onClick={() => setIsDark(!isDark)}
    >
        {isDark ? <Sun className='cursor-pointer' /> : <MoonIcon className='cursor-pointer' />}
    </div>
  )
}

export default ThemeToggle