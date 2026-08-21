import { ThemeProvider } from './lib/theme';
import CustomCursor from './components/CustomCursor';
import Intro from './components/Intro';
import SectionGlow from './components/SectionGlow';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-transparent text-inherit">
        <Intro/>
        <CustomCursor />
        <SectionGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;