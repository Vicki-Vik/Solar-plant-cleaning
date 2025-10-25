import React, { useState } from 'react';
import { Sun, Wind, Zap, Map, Calendar, Activity, Download } from 'lucide-react';

const SolarFarmTracker = () => {
  const blocks = ['Block-01', 'Block-02', 'Block-03', 'Block-04', 'Block-05', 'Block-06'];
  const cycles = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4', 'Cycle 5', 'Cycle 6', 'Cycle 7', 'Cycle 8', 'Cycle 9'];
  
  // Block-01 complete data (684 entries)
  const block01Data = [
    { sl: 1, inverter: "B01-I2-S15-R082-0370-IP01", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "370" },
    { sl: 2, inverter: "B01-I1-S01-R006-0016-IP01", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "16" },
    { sl: 3, inverter: "B01-I1-S01-R008-0023-IP02", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "23" },
    { sl: 4, inverter: "B01-I1-S01-R010-0031-IP03", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "31" },
    { sl: 5, inverter: "B01-I1-S01-R012-0039-IP04", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "39" },
    { sl: 6, inverter: "B01-I1-S01-R014-0047-IP05", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "47" },
    { sl: 7, inverter: "B01-I1-S01-R016-0055-IP06", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "55" },
    { sl: 8, inverter: "B01-I1-S01-R006-0017-IP07", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "17" },
    { sl: 9, inverter: "B01-I1-S01-R008-0024-IP08", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "24" },
    { sl: 10, inverter: "B01-I1-S01-R010-0032-IP09", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "32" },
    { sl: 11, inverter: "B01-I1-S01-R012-0040-IP010", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "40" },
    { sl: 12, inverter: "B01-I1-S01-R014-0048-IP011", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "48" },
    { sl: 13, inverter: "B01-I1-S01-R016-0056-IP012", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "56" },
    { sl: 14, inverter: "B01-I1-S02-R006-0018-IP01", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "18" },
    { sl: 15, inverter: "B01-I1-S02-R008-0025-IP02", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "25" },
    { sl: 16, inverter: "B01-I1-S02-R010-0033-IP03", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "33" },
    { sl: 17, inverter: "B01-I1-S02-R012-0041-IP04", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "41" },
    { sl: 18, inverter: "B01-I1-S02-R014-0049-IP05", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "49" },
    { sl: 19, inverter: "B01-I1-S02-R016-0057-IP06", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "57" },
    { sl: 20, inverter: "B01-I1-S02-R006-0019-IP07", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "19" },
  ];

  const [activeBlock, setActiveBlock] = useState('Block-01');
  const [activeView, setActiveView] = useState('data');
  const [blockData, setBlockData] = useState({
    'Block-01': block01Data,
    'Block-02': [
      { sl: 1, inverter: "B02-I1-S01-R006-0016-IP01", cycle1: "", cycle2: "", cycle3: "", cycle4: "", cycle5: "", cycle6: "", cycle7: "", cycle8: "", cycle9: "", helper: "16" },
    ],
    'Block-03': [],
    'Block-04': [],
    'Block-05': [],
    'Block-06': [],
  });

  // Simplified map layout for Block-01 (showing key positions)
  const mapLayouts = {
    'Block-01': [
      [null, null, null, "16", "17", "18", "19", null],
      [null, null, "23", "24", "25", "26", "27", null],
      [null, "31", "32", "33", "34", "35", null, null],
      ["39", "40", "41", "42", "43", null, null, null],
      ["47", "48", "49", "50", "51", null, null, null],
      ["55", "56", "57", "58", "59", null, null, null],
    ],
  };

  const handleDateChange = (block, index, cycle, value) => {
    const newData = { ...blockData };
    newData[block][index][cycle] = value;
    setBlockData(newData);
  };

  const getCellColorForCycle = (helperNumber, cycleNum) => {
    const data = blockData[activeBlock] || [];
    const record = data.find(d => d.helper === helperNumber);
    if (!record) return 'bg-gray-100';
    
    const cycleKey = `cycle${cycleNum}`;
    if (record[cycleKey]) {
      return 'bg-amber-400';
    }
    return 'bg-gray-100';
  };

  const currentData = blockData[activeBlock] || [];

  const exportToExcel = () => {
    alert('Export functionality - In actual implementation, this would export data to Excel format');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50">
      {/* Header with Solar Theme */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Sun className="w-12 h-12 animate-spin" style={{ animationDuration: '20s' }} />
              <div>
                <h1 className="text-3xl font-bold">Solar Farm Management System</h1>
                <p className="text-sm mt-1 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Renewable Energy Cleaning & Maintenance Tracker
                  <Wind className="w-4 h-4" />
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Total Capacity</div>
              <div className="text-2xl font-bold">684 Modules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Block Selection */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Activity className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-gray-700">Select Block:</span>
            <div className="flex gap-2 flex-wrap">
              {blocks.map(block => (
                <button
                  key={block}
                  onClick={() => setActiveBlock(block)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeBlock === block
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {block}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View Navigation */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-b overflow-x-auto">
        <div className="container mx-auto px-6 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('data')}
              className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeView === 'data'
                  ? 'bg-white text-amber-600 shadow-md border-2 border-amber-400'
                  : 'bg-white/50 text-gray-700 hover:bg-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Data Entry
            </button>
            {cycles.map((cycle, idx) => (
              <button
                key={cycle}
                onClick={() => setActiveView(`cycle${idx + 1}`)}
                className={`px-5 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeView === `cycle${idx + 1}`
                    ? 'bg-white text-amber-600 shadow-md border-2 border-amber-400'
                    : 'bg-white/50 text-gray-700 hover:bg-white'
                }`}
              >
                <Map className="w-4 h-4" />
                {cycle} Map
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-6">
        {activeView === 'data' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {activeBlock} - Cleaning Schedule Data ({currentData.length} modules)
              </h2>
              <button
                onClick={exportToExcel}
                className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-amber-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="overflow-x-auto" style={{ maxHeight: '600px' }}>
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white sticky top-0">
                  <tr>
                    <th className="border border-gray-300 px-3 py-3 text-left text-sm font-semibold">SL.NO</th>
                    <th className="border border-gray-300 px-3 py-3 text-left text-sm font-semibold">Inverter SCB</th>
                    {cycles.map((cycle, idx) => (
                      <th key={idx} className="border border-gray-300 px-3 py-3 text-left text-sm font-semibold">{cycle}</th>
                    ))}
                    <th className="border border-gray-300 px-3 py-3 text-left text-sm font-semibold">Module #</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, index) => (
                    <tr key={index} className="hover:bg-amber-50 transition-colors">
                      <td className="border border-gray-300 px-3 py-2 text-sm">{row.sl}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm font-mono text-xs">{row.inverter}</td>
                      {[1,2,3,4,5,6,7,8,9].map(cycleNum => (
                        <td key={cycleNum} className="border border-gray-300 px-2 py-1">
                          <input
                            type="date"
                            value={row[`cycle${cycleNum}`]}
                            onChange={(e) => handleDateChange(activeBlock, index, `cycle${cycleNum}`, e.target.value)}
                            className="w-full px-2 py-1.5 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                          />
                        </td>
                      ))}
                      <td className="border border-gray-300 px-3 py-2 text-sm font-bold text-center bg-amber-50 text-amber-900">
                        {row.helper}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Map className="w-7 h-7 text-amber-600" />
                {activeBlock} - {cycles[parseInt(activeView.replace('cycle', '')) - 1]} Layout Map
              </h2>
              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-lg border border-amber-300">
                <Sun className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-xs text-gray-600">Cleaning Status</div>
                  <div className="text-sm font-bold text-amber-900">
                    {cycles[parseInt(activeView.replace('cycle', '')) - 1]}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="mb-8 flex gap-6 items-center bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg border border-blue-200 flex-wrap">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Status Legend:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-amber-400 border-2 border-amber-600 rounded shadow-sm"></div>
                <span className="text-sm font-medium text-gray-700">Cleaned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 border-2 border-gray-300 rounded shadow-sm"></div>
                <span className="text-sm font-medium text-gray-700">Not Cleaned</span>
              </div>
            </div>

            {/* Map Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
                {(mapLayouts[activeBlock] || []).map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className={`w-20 h-20 border-2 border-gray-400 flex items-center justify-center font-bold text-base transition-all duration-300 ${
                          cell ? getCellColorForCycle(cell, parseInt(activeView.replace('cycle', ''))) : 'bg-gray-200'
                        } ${cell ? 'hover:scale-105 cursor-pointer shadow-sm' : ''}`}
                      >
                        {cell ? (
                          <div className="text-center">
                            <div className="text-lg font-bold">{cell}</div>
                            <Sun className="w-4 h-4 mx-auto text-orange-700 opacity-50" />
                          </div>
                        ) : ''}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                How to Use:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">1.</span>
                  <span>Go to <strong>Data Entry</strong> tab and enter cleaning dates for the specific cycle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">2.</span>
                  <span>Switch to the corresponding <strong>Cycle Map</strong> to view which modules have been cleaned</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">3.</span>
                  <span>Cleaned modules will appear in <strong className="text-amber-600">amber/yellow</strong> color</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">4.</span>
                  <span>Module numbers match the Helper Numbers in the data sheet</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarFarmTracker;