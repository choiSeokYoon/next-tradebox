import Sidebar from "components/sidebar";

export default function MainLayout({ children }) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
