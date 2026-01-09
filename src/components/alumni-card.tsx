import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AlumniMember } from "@/data/alumni";

interface AlumniCardProps {
  alumni: AlumniMember;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center gap-4 w-full">
          <img
            src={alumni.profile_picture_url}
            alt={alumni.full_name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-base">{alumni.full_name}</h3>
            <p className="text-sm text-muted-foreground">{alumni.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="w-full md:w-3/4 mx-auto flex items-center justify-between gap-2">
          <Badge className="py-3 px-5">{alumni.lab}</Badge>
          <Badge className="py-3 px-7">{alumni.graduation_year}</Badge>
        </div>
        <div className="w-full md:w-3/4 mx-auto space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Position</p>
            <p className="text-sm font-medium">{alumni.current_position}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Company</p>
            <p className="text-sm font-medium truncate">{alumni.current_company}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Interests</p>
            <p className="text-sm truncate">{alumni.research_interests}</p>
          </div>
        </div>
        {alumni.linkedin_url && (
          <Button variant={"default"} className="w-full" asChild>
            <a href={alumni.linkedin_url} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
