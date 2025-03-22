import React, { useEffect, useState } from "react";

function Reports() {
  const [metrics, setMetrics] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/analytics/dashboard");
        const data = await response.json();
        setMetrics(data.emailMetrics);
        setCampaigns(data.campaignPerformance || []);
      } catch (error) {
        console.error("Failed to fetch reports data", error);
      }
    };

    fetchData();
  }, []);

  const metricItems = metrics
    ? [
        {
          label: "Sent Emails",
          value: metrics.sent.count.toLocaleString(),
          trend: `${metrics.sent.percentChange}% from last month`,
        },
        {
          label: "Opens",
          value: metrics.opens.count.toLocaleString(),
          trend: `${metrics.opens.percentChange}% from last month`,
        },
        {
          label: "Clicks",
          value: metrics.clicks.count.toLocaleString(),
          trend: `${metrics.clicks.percentChange}% from last month`,
        },
        {
          label: "Bounced Emails",
          value: metrics.bounced.count.toLocaleString(),
          trend: `${metrics.bounced.percentChange}% from last month`,
        },
        {
          label: "Open Rate",
          value: `${metrics.openRate.value}%`,
          trend: `${metrics.openRate.percentChange}% from last month`,
        },
        {
          label: "Click Rate",
          value: `${metrics.clickRate.value}%`,
          trend: `${metrics.clickRate.percentChange}% from last month`,
        },
      ]
    : [];

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white gap-6 px-8 py-12">
      {/* Header */}
      <header className="w-full max-w-7xl px-8 py-6 rounded-lg flex justify-left mb-8 sm:mb-12">
        <h1 className="text-3xl font-bold text-purple-400">Promoivo Performance Report</h1>
      </header>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mb-8 sm:mb-12">
        {metricItems.length > 0 ? (
          metricItems.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow text-center">
              <h2 className="text-sm sm:text-lg font-semibold">{item.label}</h2>
              <p className="text-lg sm:text-2xl mt-1 font-bold text-purple-400">{item.value}</p>
              <p className="text-xs sm:text-sm text-gray-400">{item.trend}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Loading metrics...</p>
        )}
      </section>

      {/* Campaign Performance Title */}
      <h2 className="text-2xl font-bold text-purple-400 mb-4 sm:mb-6">Campaign Performance</h2>

      {/* Campaign Performance Table */}
      <section className="bg-gray-800 w-full max-w-7xl p-8 rounded-lg shadow-lg overflow-x-auto mb-8 sm:mb-12">
        <table className="w-full border-collapse text-gray-300">
          <thead>
            <tr className="bg-purple-600 text-white text-xl">
              <th className="p-6 text-left sm:text-center">Campaign</th>
              <th className="p-6">Sent</th>
              <th className="p-6">Opens</th>
              <th className="p-6">Clicks</th>
              <th className="p-6">Bounced</th>
              <th className="p-6">Unsubscribes</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((row, index) => (
                <tr
                  key={row.campaignId || index}
                  className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"} border-b border-gray-500`}
                >
                  <td className="p-6 text-center text-lg">{row.name}</td>
                  <td className="p-6 text-center text-lg">{row.sent}</td>
                  <td className="p-6 text-center text-lg">{row.opens}</td>
                  <td className="p-6 text-center text-lg">{row.clicks}</td>
                  <td className="p-6 text-center text-lg">{row.bounced}</td>
                  <td className="p-6 text-center text-lg">{row.unsubscribes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  Loading campaign performance...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Reports;
