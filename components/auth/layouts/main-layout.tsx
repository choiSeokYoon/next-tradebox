import Header from "components/header";
import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
