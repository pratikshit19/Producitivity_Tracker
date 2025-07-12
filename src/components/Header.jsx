import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import bluebg from "../assets/images/bluebg.jpg";

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Comfortable with discomfort.",
    "Progress, not perfection.",
    "Kaizen. One step at a time.",
    "Discipline equals freedom.",
    "Small habits make big changes.",
  ];

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, [quoteIndex]);

  const handleNext = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrev = () => {
    setQuoteIndex((prev) =>
      prev === 0 ? quotes.length - 1 : prev - 1
    );
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // also allow mouse drag on desktop
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = time.toLocaleDateString(undefined, options);
  const timeStr = time.toLocaleTimeString();

  return (
    <div className="relative w-full mx-auto rounded-xl overflow-hidden shadow-lg mb-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bluebg})`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center p-8">
        <h1 className="text-2xl font-bold text-white">{dateStr}</h1>
        <h2 className="text-xl mt-1 text-gray-200">{timeStr}</h2>

        {/* Quote with swipe */}
        <div
          {...handlers}
          className="mt-4 text-orange-300 italic max-w-xs mx-auto cursor-grab select-none"
        >
          "{quotes[quoteIndex]}"
        </div>
        <p className="text-sm text-gray-400 mt-2">(Swipe left or right)</p>
      </div>
    </div>
  );
}
