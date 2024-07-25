import React from 'react';

export interface LogoProps {
    src?: string;
    alt?: string;
}

const Logo: React.FC = ({src = '/assets/images/punktaro-logo.svg', alt='logo' }: LogoProps) => <img src={src} alt={alt} />;

export default Logo;
