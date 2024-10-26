const DashboardWelcome = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample cards */}
        <div className="card bg-base-200 shadow-md p-4">
          <h2 className="text-lg font-bold">Overview</h2>
          <p>Details about the system status and performance.</p>
        </div>
        <div className="card bg-base-200 shadow-md p-4">
          <h2 className="text-lg font-bold">Analytics</h2>
          <p>Key metrics and user engagement details.</p>
        </div>
        <div className="card bg-base-200 shadow-md p-4">
          <h2 className="text-lg font-bold">Reports</h2>
          <p>Download monthly and weekly reports.</p>
        </div>
      </div>

      <div className="stats shadow mt-8 grid grid-cols-3">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
