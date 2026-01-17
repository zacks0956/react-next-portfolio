'use client';

export default function ContributionGraph() {
  // Generate a year of contribution data (52 weeks)
  const weeks = 52;
  const daysPerWeek = 7;
  
  const getRandomLevel = () => {
    const rand = Math.random();
    if (rand > 0.8) return 4;
    if (rand > 0.6) return 3;
    if (rand > 0.4) return 2;
    if (rand > 0.2) return 1;
    return 0;
  };

  const getLevelColor = (level: number) => {
    const colors = [
      '#161b22', // Level 0 - no contributions
      '#0e4429', // Level 1
      '#006d32', // Level 2
      '#26a641', // Level 3
      '#39d353', // Level 4
    ];
    return colors[level];
  };

  return (
    <div className="bg-github-canvas-overlay border border-github-border-default rounded-github p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-github-fg-default font-semibold">
          347 contributions in the last year
        </h2>
      </div>

      {/* Graph */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                const level = getRandomLevel();
                return (
                  <div
                    key={dayIndex}
                    className="w-[10px] h-[10px] rounded-sm cursor-pointer hover:ring-2 hover:ring-github-fg-muted transition-all"
                    style={{ backgroundColor: getLevelColor(level) }}
                    title={`${level} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-github-fg-muted">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-[10px] h-[10px] rounded-sm"
              style={{ backgroundColor: getLevelColor(level) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
