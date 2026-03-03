import { Outlet } from "react-router-dom";

import { AppLayout } from "../../components/AppLayout";
import Header from "../../components/Header";

export default function App() {
  return (
    <AppLayout title="React Learning Project">
      <Header />
      <Outlet />
    </AppLayout>
  );
}