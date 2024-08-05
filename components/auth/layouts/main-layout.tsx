import Header from "components/header";
import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 lg:pl-56 pb-2">
        {children}
        </main>
      </div>
    </div>
  );
}
