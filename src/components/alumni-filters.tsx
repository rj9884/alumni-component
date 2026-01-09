import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlumniMember } from "@/data/alumni";

interface AlumniFiltersProps {
  alumni: AlumniMember[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  labs: string[];
  years: number[];
  companies: string[];
  positions: string[];
}

export function AlumniFilters({ alumni, onFilterChange }: AlumniFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    labs: [],
    years: [],
    companies: [],
    positions: [],
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const labs = [...new Set(alumni.map((a) => a.lab))];
  const years = [
    ...new Set(alumni.map((a) => a.graduation_year).sort((a, b) => b - a)),
  ];
  const companies = [...new Set(alumni.map((a) => a.current_company))];
  const positions = [...new Set(alumni.map((a) => a.current_position))];

  const toggleFilter = (
    type: keyof FilterState,
    value: string | number
  ) => {
    setFilters((prev) => {
      const current = prev[type] as (string | number)[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({ labs: [], years: [], companies: [], positions: [] });
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          {(filters.labs.length > 0 ||
            filters.years.length > 0 ||
            filters.companies.length > 0 ||
            filters.positions.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 overflow-visible">{labs.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Lab</h4>
            <div className="space-y-1.5">
              {labs.map((lab) => (
                <label key={lab} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.labs.includes(lab)}
                    onChange={() => toggleFilter("labs", lab)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{lab}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {years.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Graduation Year</h4>
            <div className="space-y-1.5">
              {years.map((year) => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.years.includes(year)}
                    onChange={() => toggleFilter("years", year)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{year}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {companies.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Company</h4>
            <div className="space-y-1.5">
              {companies.map((company) => (
                <label key={company} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.companies.includes(company)}
                    onChange={() => toggleFilter("companies", company)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm truncate">{company}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {positions.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Position</h4>
            <div className="space-y-1.5">
              {positions.map((position) => (
                <label key={position} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.positions.includes(position)}
                    onChange={() => toggleFilter("positions", position)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm truncate">{position}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
