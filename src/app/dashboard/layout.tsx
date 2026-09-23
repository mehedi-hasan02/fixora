import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar variant="dashboard" showProfile />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
