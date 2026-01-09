import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AlumniMember } from "@/data/alumni";

interface AlumniCardProps {
  alumni: AlumniMember;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <img
            src={alumni.profile_picture_url}
            alt={alumni.full_name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{alumni.full_name}</h3>
            <p className="text-sm text-gray-600 truncate">{alumni.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{alumni.lab}</Badge>
          <Badge variant="outline">{alumni.graduation_year}</Badge>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500">Position</p>
            <p className="text-sm font-medium">{alumni.current_position}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Company</p>
            <p className="text-sm font-medium truncate">
              {alumni.current_company}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interests</p>
            <p className="text-sm truncate">{alumni.research_interests}</p>
          </div>
        </div>
        {alumni.linkedin_url && (
          <Badge variant="outline" asChild>
            <a
              href={alumni.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <span>LinkedIn Profile</span>
              <span aria-hidden>→</span>
            </a>
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
