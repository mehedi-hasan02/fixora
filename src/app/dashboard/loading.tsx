const DashboardLoading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
