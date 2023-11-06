import React, { useEffect, useState } from "react";

interface TransportProps {
  dotIndex: number,
  onDotIndexChange: (dotIndex: number) => void
}

export default function Transport(props: TransportProps) {
  const [dotIndex, setDotIndex] = useState(props.dotIndex);

  // Update dotIndex when selectedDotItemIndex changes
  useEffect(() => {
    setDotIndex(props.dotIndex);
  }, [props.dotIndex]);

  useEffect(() => {
    props.onDotIndexChange(dotIndex);
  }, [dotIndex]);

  const handleRightClick = () => {
    setDotIndex(dotIndex + 1);
  };

  const handleLeftClick = () => {
    setDotIndex(dotIndex - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") 
    {
      setDotIndex(dotIndex + 1);
    } 
    else if (e.key === "ArrowLeft") 
    {
      setDotIndex(dotIndex - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown as any); // Cast to any
    // Ensure to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [dotIndex]);

  return (
    <div className="mt-10">
      <button className="bg-emerald-400 p-1 rounded-sm mr-2" onClick={handleLeftClick}>← LEFT</button>
      <button className="bg-emerald-400 p-1 rounded-sm" onClick={handleRightClick}>RIGHT →</button>
      <p>DOT INDEX: {dotIndex}</p>
    </div>
  );
}