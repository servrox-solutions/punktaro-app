'use client';

// Example usage in another component
import React, { useEffect, useState } from 'react';
import CardSquare from '../../../../components/CardSquare';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/_store/store';
import { showErrorToast } from '../../../../components/ErrorToast';
import { setWallet } from '@/app/_store/userSlice';
import { queryBonusCards } from '@/app/_usecases/queryBonusCards';

interface RetailBusiness {
    name: string;
    address: string;
    color: string;
    curStamps: number;
    maxStamps: number;
}

const Wallet: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const userAddress = useSelector((state: RootState) => state.auth.userAddress);  
    const cards = useSelector((state: RootState) => state.user.bonusCards);  

    useEffect(() => {
        const init = async () => {
            const bonusCards = await queryBonusCards(userAddress).catch(err => {
                    showErrorToast('Beim Laden der Bonus-Karten ist ein Fehler aufgetreten.');
                    console.error(err);
                    return [];
            });
            dispatch(setWallet(bonusCards));
        }
        init();
    }, [userAddress]);

    // const cards: RetailBusiness[] = [
    // {
    //     name: "Buchhandlung Leseratte",
    //     address: "Hauptstraße 12, 10115 Berlin",
    //     color: "yellow",
    //     stamps: 3
    // },
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
// ];

  return (
    <div className="flex flex-col w-full gap-3">
        <h1 className="my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl ml-2 lg:text-6xl dark:text-gray-900">Meine Karten</h1>
        {
            cards?.map((card, cardIdx) => {
                return <div className="relative" key={cardIdx}>
                    <CardSquare color={'yellow'}>
                    <div className="py-4 mt-12 ml-5">
                        <a href="#">
                            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-800">{card.name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-900 dark:text-gray-900">{card.address}</p>
                    </div>
                    <div className="bg-white/80 absolute top-0 left-0 p-4 w-full">
                              <div className="flex gap-3 flex-wrap">
                        {
                            Array.from({ length: card.maxStamps }, (_, i) => 
                                <div key={i} className="flex items-center justify-center border-2 border-primary rounded-full w-[20px] h-[20px]">
                                    {i < card.curStamps && <svg
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
                </CardSquare>
                </div>
            }) || <h1>Hier erscheinen deine Bonus-Karten</h1>
        }    
    </div>
  );
};

export default Wallet;
