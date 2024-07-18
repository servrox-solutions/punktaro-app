import "./CardSquare.css";

export interface CardSquareProps {
  color: 'yellow' | 'blue' | 'green' | 'purple';
}

const CardSquare = ({
  children,
  color
}: Readonly<{
  children: React.ReactNode;
} & CardSquareProps>) => {
  return (
    <div className={`card card-${color} p-6 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
        <div className="area" >
                <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
        </div >
        <div style={{zIndex: '10'}}>{children}</div>
    </div>

  );
};

export default CardSquare;
