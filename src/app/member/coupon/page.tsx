// src/pages/settings.tsx
import React from 'react';
import Card from '../../../../components/Card';

interface DiscountCoupon {
  date: string;
  name: string;
  address: string;
  color: string;
  discount: string;
  description: string;
  conditions?: string;
}

const Settings: React.FC = () => {
  const cards: DiscountCoupon[] = [
    {
      date: '23.06.24 - 29.06.24',
      name: "Camp David | Soccx",
      address: "Ettlinger Tor, Karl-Friedrich-Straße 26, 76133 Karlsruhe",
      color: "yellow",
      discount: '50%',
      description: '50% Rabatt auf Alles',
      conditions: 'Bereits reduzierte Artikel, NOS Jeans & Gürtel, NOS Body & Basic, Parfüm, Saison 58, CAD HOME und SENSES.THE LABEL sind ausgeschlossen.'
    },
    {
      date: 'Ab dem 17.06.2024',
      name: "Tom Tailor Holiday Sale",
      address: "Ettlinger Tor, Karl-Friedrich-Straße 26, 76133 Karlsruhe",
      color: "green",
      discount: 'bis 30%',
      description: 'Sale: bis zu 30%',
      conditions: undefined,
    },
    {
      date: "SOLANGE DER VORRAT REICHT",
      name: "GUESS",
      address: "Ettlinger Tor, Karl-Friedrich-Straße 26, 76133 Karlsruhe",
      color: "red",
      discount: "PROMO NETZTASCHE",
      description: "Gratis Netztasche",
      conditions: "Kunden erhalten ab einem Einkaufswert von 180 € eine Netztasche."
    }

  ];

  return (
    <div className="flex flex-col w-full gap-3">
        <h1 className="my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl ml-2 lg:text-6xl dark:text-gray-900">Aktuelle Angebote</h1>
        {
            
            cards.map((card, cardIdx) => {
                return <div className="relative" key={cardIdx}>
                    
                  <div className="py-4 px-5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 text-primary">
                          {card.name}
                        </h5>
                      </a>
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2.5 py-0.5 rounded">
                        {card.date}
                      </span>
                    </div>
                    <p className="text-3xl mb-3 font-normal text-gray-900 dark:text-gray-200">
                      {card.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-sm font-normal text-gray-900 dark:text-gray-400">
                        {card.address}
                      </p>
                    </div>
                    {card.conditions && (
                      <div className="text-sm">
                        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Konditionen:
                        </p>
                        <p className="font-normal text-gray-900 dark:text-gray-400">
                          {card.conditions}
                        </p>
                      </div>
                    )}
                  </div>

                    
                </div>
            })
        }    
    </div>
  );
};

export default Settings;
