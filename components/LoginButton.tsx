'use client';

export interface LoginButtonProps {
    icon: {
        path: string;
        alt: string;
    }
    text: string;
    handler: () => void;
}

const LoginButton = ({
    icon, text, handler
}: LoginButtonProps) => {

    return (
        <button onClick={() => handler()}
                className="flex items-center justify-start w-full py-4 px-6 mb-4 border border-border rounded bg-white text-textSecondary hover:bg-gray-50"
            >
            <img src={icon.path} alt={icon.alt} className="w-8 h-8 mr-3" />
            <span className="text-lg">{text}</span>
        </button>
    );
};

export default LoginButton;
