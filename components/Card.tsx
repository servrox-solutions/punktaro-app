import "./Card.css";

export interface CardProps {
  color: 'yellow' | 'blue' | 'green' | 'purple';
}

const Card = ({
  children,
  color
}: Readonly<{
  children: React.ReactNode;
} & CardProps>) => {
  return (
    <div className={`card card-${color} p-6 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
        <div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
        <div style={{position: 'inline', zIndex: '10'}}>{children}</div>
    </div>

  );
};

export default Card;
