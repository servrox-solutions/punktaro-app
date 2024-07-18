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
        <div style={{zIndex: '3', position: 'inherit'}}>{children}</div>
        <div>
            <div className="wave" style={{zIndex: 1}}></div>
            <div className="wave" style={{zIndex: 1}}></div>
            <div className="wave" style={{zIndex: 1}}></div>
        </div>
    </div>

  );
};

export default Card;
