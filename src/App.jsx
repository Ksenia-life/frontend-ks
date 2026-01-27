import { AppLayout } from "./components/AppLayout";
import { Header } from "./components/Header";
import { UserCard } from "./components/UserCard";

export default function App() {
  const user = { name: "Ксения", role: "Junior Frontend" };

  return (
    <AppLayout title="ДЗ 2 — Vite + React">
      <Header subtitle="Компоненты взаимодействуют через props и children" />
      <UserCard name={user.name} role={user.role} />
    </AppLayout>
  );
}