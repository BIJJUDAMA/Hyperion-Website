import { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import LoadingCurtain from './components/LoadingCurtain';
import SectionIndicator from './components/SectionIndicator';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import WhatIsHyperloop from './sections/WhatIsHyperloop';
import MeetHyperion from './sections/MeetHyperion';
import Subsystems from './sections/Subsystems';
import Events from './sections/Events';
import Achievements from './sections/Achievements';
import TeamGrid from './sections/TeamGrid';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <LoadingCurtain onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <SmoothScroll>
        <div className="relative min-h-screen noise-overlay">
          <Navigation />
          <SectionIndicator />
          <BackToTop />
          <main className="relative">
            <Hero startAnimation={isLoaded} />
            <div id="about">
              <WhatIsHyperloop />
            </div>
            <MeetHyperion />
            <div id="subsystems">
              <Subsystems />
            </div>
            <div id="events">
              <Events />
            </div>
            <div id="achievements">
              <Achievements />
            </div>
            <div id="team">
              <TeamGrid />
            </div>
            <Gallery />
            <div id="contact">
              <Contact />
            </div>
          </main>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
