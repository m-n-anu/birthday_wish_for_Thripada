import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import FloatingDecorations from './components/FloatingDecorations';
import ProgressIndicator from './components/ProgressIndicator';
import CountdownSection from './components/CountdownSection';
import DiyaSection from './components/DiyaSection';
import CakeSection from './components/CakeSection';
import MemorySection from './components/MemorySection';
import FinalBirthdaySection from './components/FinalBirthdaySection';
import { memoriesData } from './data/memories';

export default function App() {
  const [activeSection, setActiveSection] = useState('countdown');

  // Track active section as user scrolls
  useEffect(() => {
    const sectionIds = [
      'countdown',
      'diya',
      'cake',
      'memory-1',
      'memory-2',
      'memory-3',
      'memory-4',
      'memory-5',
      'finale'
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollY + offset >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="royal-app-wrapper" style={{ position: 'relative', width: '100%' }}>
      {/* Ambient background particles & sparkles */}
      <FloatingDecorations />

      {/* Royal Fixed Header */}
      <HeaderNav activeSection={activeSection} />

      {/* Side & Top Progress Tracker */}
      <ProgressIndicator activeSection={activeSection} />

      {/* Main Continuous Journey */}
      <main>
        {/* 1. Countdown Section */}
        <CountdownSection
          onComplete={() => scrollToId('diya')}
        />

        {/* 2. Interactive Diya Lighting Ceremony */}
        <DiyaSection
          onContinue={() => scrollToId('cake')}
        />

        {/* 3. Interactive Cake Cutting & Serving */}
        <CakeSection
          onOpenMemories={() => scrollToId('memory-1')}
        />

        {/* 4. Five Memory Sections Containing Nine Personal Photos */}
        {memoriesData.map((memory, index) => {
          const nextTarget =
            index < memoriesData.length - 1
              ? `memory-${memoriesData[index + 1].id}`
              : 'finale';
          const prevTarget =
            index > 0
              ? `memory-${memoriesData[index - 1].id}`
              : 'cake';

          return (
            <MemorySection
              key={memory.id}
              memory={memory}
              index={index}
              total={memoriesData.length}
              onPrev={() => scrollToId(prevTarget)}
              onNext={() => scrollToId(nextTarget)}
              isLast={index === memoriesData.length - 1}
            />
          );
        })}

        {/* 5. Final Grand Birthday Celebration */}
        <FinalBirthdaySection
          onReplay={() => scrollToId('countdown')}
        />
      </main>

    </div>
  );
}

