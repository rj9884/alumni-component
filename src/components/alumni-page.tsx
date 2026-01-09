import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { AlumniCard } from "./alumni-card";
import { AlumniFilters, type FilterState } from "./alumni-filters";
import { ALUMNI_DATA, } from "@/data/alumni";
import { Search } from "lucide-react";

export function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    labs: [],
    years: [],
    companies: [],
    positions: [],
  });

  const filteredAlumni = useMemo(() => {
    return ALUMNI_DATA.filter((alumni) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        alumni.full_name.toLowerCase().includes(searchLower) ||
        alumni.email.toLowerCase().includes(searchLower) ||
        alumni.lab.toLowerCase().includes(searchLower) ||
        alumni.current_company.toLowerCase().includes(searchLower) ||
        alumni.current_position.toLowerCase().includes(searchLower) ||
        alumni.research_interests.toLowerCase().includes(searchLower);

      const matchesLabs =
        filters.labs.length === 0 || filters.labs.includes(alumni.lab);
      const matchesYears =
        filters.years.length === 0 || filters.years.includes(alumni.graduation_year);
      const matchesCompanies =
        filters.companies.length === 0 ||
        filters.companies.includes(alumni.current_company);
      const matchesPositions =
        filters.positions.length === 0 ||
        filters.positions.includes(alumni.current_position);

      return (
        matchesSearch &&
        matchesLabs &&
        matchesYears &&
        matchesCompanies &&
        matchesPositions
      );
    });
  }, [searchTerm, filters]);

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      <div className="bg-background border-b shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company, position, interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 overflow-y-auto">
              <AlumniFilters alumni={ALUMNI_DATA} onFilterChange={setFilters} />
            </div>

            <div className="lg:col-span-3 flex flex-col overflow-hidden">
              {filteredAlumni.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No alumni found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAlumni.map((alumni) => (
                      <AlumniCard key={alumni.id} alumni={alumni} />
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-4 shrink-0">
                Showing {filteredAlumni.length} of {ALUMNI_DATA.length} alumni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
