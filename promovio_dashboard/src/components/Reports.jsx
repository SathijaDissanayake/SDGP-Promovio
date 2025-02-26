import React from "react";

function Reports() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white gap-6 px-8 py-12">
      {/* Header */}
      <header className="w-full max-w-7xl px-8 py-6 rounded-lg flex justify-left mb-8 sm:mb-12">
        <h1 className="text-3xl font-bold text-purple-400">Promoivo Performance Report</h1>
      </header>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mb-8 sm:mb-12">
        {[
          { label: "Sent Emails", value: "40,902", trend: "+5% from last month" },
          { label: "Opens", value: "26,258", trend: "+12% from last month" },
          { label: "Clicks", value: "873", trend: "-3% from last month" },
          { label: "Bounced Emails", value: "1,802", trend: "+2% from last month" },
          { label: "Open Rate", value: "64.20%", trend: "+4.5% from last month" },
          { label: "Click Rate", value: "2.13%", trend: "-1% from last month" }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow text-center">
            <h2 className="text-sm sm:text-lg font-semibold">{item.label}</h2>
            <p className="text-lg sm:text-2xl mt-1 font-bold text-purple-400">{item.value}</p>
            <p className="text-xs sm:text-sm text-gray-400">{item.trend}</p>
          </div>
        ))}
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
            {[
              ["Campaign 1", 6768, 5011, 227, 21, 83],
              ["Campaign 2", 3267, 3301, 90, 7, 49],
              ["Campaign 3", 4852, 3268, 76, 27, 59],
              ["Campaign 4", 3405, 2426, 67, 27, 40],
              ["Campaign 5", 1433, 1093, 44, 623, 49],
              ["Total", 25577, 16846, 604, 728, 323]
            ].map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"} border-b border-gray-500`}>
                {row.map((cell, i) => (
                  <td key={i} className="p-6 text-center text-lg">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Reports;
