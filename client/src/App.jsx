import Footer from './components/common/Footer';
import Header from './components/common/Header';
import AppRoutes from './routes/app-routes';

function App() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
