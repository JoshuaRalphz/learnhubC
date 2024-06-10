
import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Logo: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div>
            {theme === 'dark' ? (
                <Image src="/assets/logo-dark.png" alt="Dark Mode Logo" width={150} height={150} />
            ) : (
                <Image src="/assets/logo-white.png" alt="Light Mode Logo" width={150} height={150} />
            )}
        </div>
    );
};

export default Logo;
