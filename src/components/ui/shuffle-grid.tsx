"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SQUARE_DATA } from "../../data";

export const ShuffleHero = () => {
    return (
        <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
            <div>
                <span className="block mb-4 text-xs md:text-sm text-accent-purple font-bold uppercase tracking-widest">
                    Sovereignty in every pixel
                </span>
                <h3 className="text-4xl md:text-6xl font-sans font-black text-deep-purple uppercase tracking-tighter mb-6">
                    Behold the New <br />Digital Empire
                </h3>
                <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6 italic">
                    Forge your legacy within the monumental walls of ARCSLA. We provide the steel of technology and the fire of creativity to conquer any digital realm.
                </p>
            </div>
            <ShuffleGrid />
        </section>
    );
};

const shuffle = (array: any[]) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

const generateSquares = () => {
    return shuffle([...SQUARE_DATA]).map((sq) => (
        <motion.div
            key={sq.id}
            layout
            transition={{ duration: 1.5, type: "spring" }}
            className="w-full h-full rounded-md overflow-hidden bg-muted"
            style={{
                backgroundImage: `url(${sq.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></motion.div>
    ));
};

const ShuffleGrid = () => {
    const timeoutRef = useRef<number | null>(null);
    const [squares, setSquares] = useState(generateSquares());

    useEffect(() => {
        shuffleSquares();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const shuffleSquares = () => {
        setSquares(generateSquares());

        timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
    };

    return (
        <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
            {squares.map((sq) => sq)}
        </div>
    );
};
