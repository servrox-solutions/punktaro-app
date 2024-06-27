'use client';

// Example usage in another component
import React from 'react';
import Card from '../../../../components/Card';

interface RetailBusiness {
    name: string;
    address: string;
    color: string;
    stamps: number;
}

const Wallet: React.FC = () => {

    const cards: RetailBusiness[] = [
    {
        name: "Buchhandlung Leseratte",
        address: "Hauptstraße 12, 10115 Berlin",
        color: "yellow",
        stamps: 3
    },
    // {
    //     name: "Bio-Markt Naturkost",
    //     address: "Musterweg 5, 40210 Düsseldorf",
    //     color: "purple",
    //     stamps: 8
    // },
    // {
    //     name: "Café Kaffeeklatsch",
    //     address: "Altstadtgasse 3, 80331 München",
    //     color: "green",
    //     stamps: 9
    // },
    // {
    //     name: "Modeboutique Chic & Schön",
    //     address: "Einkaufsstraße 7, 50667 Köln",
    //     color: "blue",
    //     stamps: 7
    // }
];

  return (
    <div className="flex flex-col w-full gap-3">
        <h1 className="my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl ml-2 lg:text-6xl dark:text-white">Meine Karten</h1>
        {
            
            cards.map((card, cardIdx) => {
                return <div className="relative"><Card color={card.color as any}>
                    <div className="pl-[120px] ml-5 h-[220px]">
                        <a href="#">
                            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">{card.name}</h5>
                        </a>
                        <p className="mb-3 pb-[20px] font-normal text-gray-900 dark:text-gray-900">{card.address}</p>
                    </div>
                    <div className="bg-white/80 absolute top-0 left-0 p-4 h-full w-[120px]">
                              <div className="flex gap-3 flex-wrap">
                        {
                            Array.from({ length: 10 }, (_, i) => 
                                <div className="flex items-center justify-center border-2 border-primary rounded-full w-[36px] h-[36px]">
                                    {i < card.stamps && <svg
                                    style={{opacity: 0.5}}
                                    width="100"
                                    height="100"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle cx="50" cy="50" r="48" stroke="#FEFEFEAA" strokeWidth="4" />
                                    <circle cx="50" cy="50" r="40" fill="#ff9800" />
                                    <path
                                        d="M50 29.15L54.6 42.2H68.4L57.4 50.8L61.9 63.85L50 55.25L38.1 63.85L42.6 50.8L31.6 42.2H45.4L50 29.15Z"
                                        fill="#FEFEFEAA"
                                    />
                                    </svg>}
                                </div>
                            )
                        }
                    </div>
                    </div>
                </Card></div>
            })
        }    
    </div>
  );
};

export default Wallet;
