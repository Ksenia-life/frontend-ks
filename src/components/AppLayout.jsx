export function AppLayout({ title, children }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>{title}</h1>

      <div style={{ border: "1px solid #ccc", padding: 12 }}>
        {children}
      </div>
    </div>
  );
}
