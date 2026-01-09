import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlumniTable } from "./alumni-table";
import { AlumniCard } from "./alumni-card";
import { AlumniFilters, type FilterState } from "./alumni-filters";
import { ALUMNI_DATA, } from "@/data/alumni";
import { Search, LayoutGrid, List, Table as TableIcon } from "lucide-react";

export function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
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
    <div className="h-screen overflow-hidden bg-background text-foreground flex flex-col">
      <div className="bg-background border-b shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company, position, interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                aria-pressed={viewMode === "grid"}
                title="Grid view"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                aria-pressed={viewMode === "list"}
                title="List view"
                onClick={() => setViewMode("list")}
              >
                <List />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                aria-pressed={viewMode === "table"}
                title="Table view"
                onClick={() => setViewMode("table")}
              >
                <TableIcon />
              </Button>
            </div>
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
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredAlumni.map((alumni) => (
                        <AlumniCard key={alumni.id} alumni={alumni} />
                      ))}
                    </div>
                  )}
                  {viewMode === "list" && (
                    <div className="grid grid-cols-1 gap-2">
                      {filteredAlumni.map((alumni) => (
                        <div key={alumni.id} className="rounded-md border border-input bg-card">
                          <div className="flex items-center gap-4 p-4">
                            <img src={alumni.profile_picture_url} alt={alumni.full_name} className="w-12 h-12 rounded-full" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{alumni.full_name}</div>
                              <div className="text-sm text-muted-foreground truncate">{alumni.email}</div>
                            </div>
                            <div className="hidden md:flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">{alumni.lab}</span>
                              <span className="text-muted-foreground">{alumni.graduation_year}</span>
                              <span className="truncate">{alumni.current_company}</span>
                              <span className="truncate">{alumni.current_position}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {viewMode === "table" && <AlumniTable data={filteredAlumni} search={searchTerm} />}
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
