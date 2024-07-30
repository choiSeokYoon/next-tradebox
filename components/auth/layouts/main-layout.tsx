import Header from "components/header";
import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
        {children}
        </div>
      
      </div>
    </main>
  );
}
