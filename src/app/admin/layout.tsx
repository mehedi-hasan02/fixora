import Sidebar from "@/components/layout/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar variant="admin" roleBadge="Admin" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};

export default AdminLayout;
