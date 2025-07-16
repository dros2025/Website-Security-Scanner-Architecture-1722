import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import SecurityScanner from './components/SecurityScanner';
import ScanResults from './components/ScanResults';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [scanData, setScanData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <SecurityScanner 
                    onScanComplete={setScanData}
                    isScanning={isScanning}
                    setIsScanning={setIsScanning}
                  />
                </motion.div>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ScanResults 
                  scanData={scanData}
                  isScanning={isScanning}
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;