"use client"

import { useEffect, useState } from 'react';

// Components
import Timeline from '../components/Timeline'
import Navbar from '@/components/Navbar';
import ItemDisplay from '@/components/ItemDisplay';

// Types
import DotItem from './types/DotItem';

// Data & Utils
import { tempDotItems } from "./data/dotItems";
import Transport from '@/components/Transport';


export default function Home() {

  const [innerTimelineWidth, setInnerTimelineWidth] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [dotItems, setDotItems] = useState<DotItem[]>([]);

  const [selectedDotItemIndex, setSelectedDotItemIndex] = useState<number>(0);
  const [selectedDotItem, setSelectedDotItem] = useState<DotItem>(dotItems[0]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };

  const handleInnerTimelineWidthUpdate = (newWidth: number) => {
    const newInnerTimelineWidth = newWidth;
    setInnerTimelineWidth(newInnerTimelineWidth);
  }

  const handleDotSelect = (index: number) => {
    const updatedSelectedDotItem = dotItems[index];
    const updatedSelectedDotItemIndex = index;
    setSelectedDotItem(updatedSelectedDotItem);
    setSelectedDotItemIndex(updatedSelectedDotItemIndex);
    console.log(updatedSelectedDotItemIndex);
  }

  // ON LOAD, SORT DOT ITEMS BY DATE
  useEffect(() => {
    const sortedDotItems = tempDotItems.slice().sort((a, b) => a.date.getTime() - b.date.getTime());
    setDotItems(sortedDotItems);
  }, []);
  

  useEffect(() => {
    
  }, [selectedDotItemIndex]);
  
  return (
    <main className="">

      <Navbar />

      <div className="container px-4 mx-auto my-10">

        <div className="flex items-center justify-between">
          <div>
            <h1>History of Traditional Construction Techniques</h1>
            <div>Created 04/09/23</div>
          </div>

          <div className="flex items-center">
            <button className="mr-3">Start presentation</button>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-10">
        <Timeline 
          innerTimelineWidth={innerTimelineWidth} 
          onInnerTimelineWidthUpdate={handleInnerTimelineWidthUpdate}  
          dotItems={dotItems}
          onDotSelect={handleDotSelect}
        />
      </div>

      <ItemDisplay selectedDotItem={selectedDotItem} />

      <div className="container px-4 mx-auto">
        <Transport 
          dotIndex={selectedDotItemIndex}
          onDotIndexChange={handleDotSelect} 
        />
      </div>

    </main>
  )
}
