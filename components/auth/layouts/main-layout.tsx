import Header from "components/header";
import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 pl-56">
        {children}
        </main>
      </div>
    </div>
  );
}
