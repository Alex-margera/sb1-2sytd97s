import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { MainApp } from './components/MainApp';
import { useAppInitialization } from './hooks/useAppInitialization';

function App() {
  const { isAppReady, progress, error } = useAppInitialization();

  if (!isAppReady) {
    return <LoadingScreen progress={progress} error={error} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <MainApp />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;