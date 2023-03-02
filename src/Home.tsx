import * as React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center">
      <header className="max-w-7xl w-[1280px] h-12 flex justify-between bg-slate-700">
        <div className="w-full flex items-center justify-between pl-4 pr-4">
          <h1 className="text-gray-200">Monitoring</h1>

          <Link to="https://youtube.com" className="text-gray-200 hover:opacity-80">Registrar-se</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
