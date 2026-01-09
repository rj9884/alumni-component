export interface AlumniMember {
  id: string;
  full_name: string;
  email: string;
  lab: string;
  graduation_year: number;
  current_company: string;
  current_position: string;
  profile_picture_url: string;
  linkedin_url: string;
  latitude: string;
  longitude: string;
  bio: string;
  research_interests: string;
  publications: Record<string, unknown>[];
  created_at: string;
}

export const ALUMNI_DATA: AlumniMember[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    full_name: "John Smith",
    email: "john@example.com",
    lab: "NORMAN",
    graduation_year: 2020,
    current_company: "Google",
    current_position: "Senior Engineer",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    linkedin_url: "https://linkedin.com/in/johnsmith",
    latitude: "37.7749",
    longitude: "-122.4194",
    bio: "Passionate about AI and machine learning",
    research_interests: "Deep Learning, NLP",
    publications: [],
    created_at: "2026-01-08T18:42:54.491Z",
  },
  {
    id: "4gb96g75-5717-4562-b3fc-2c963f66afa7",
    full_name: "Sarah Johnson",
    email: "sarah@example.com",
    lab: "NORMAN",
    graduation_year: 2021,
    current_company: "Microsoft",
    current_position: "Software Architect",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    linkedin_url: "https://linkedin.com/in/sarahjohnson",
    latitude: "47.6062",
    longitude: "-122.3321",
    bio: "Cloud computing expert",
    research_interests: "Cloud Systems, DevOps",
    publications: [],
    created_at: "2026-01-08T18:42:54.491Z",
  },
  {
    id: "5hc07h86-5717-4562-b3fc-2c963f66afa8",
    full_name: "Michael Chen",
    email: "michael@example.com",
    lab: "VISION",
    graduation_year: 2019,
    current_company: "Tesla",
    current_position: "ML Engineer",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    linkedin_url: "https://linkedin.com/in/michaelchen",
    latitude: "37.3382",
    longitude: "-121.8863",
    bio: "Computer vision and autonomous systems",
    research_interests: "Computer Vision, Robotics",
    publications: [],
    created_at: "2026-01-08T18:42:54.491Z",
  },
  {
    id: "6id18i97-5717-4562-b3fc-2c963f66afa9",
    full_name: "Emma Williams",
    email: "emma@example.com",
    lab: "NORMAN",
    graduation_year: 2022,
    current_company: "OpenAI",
    current_position: "Research Scientist",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    linkedin_url: "https://linkedin.com/in/emmawilliams",
    latitude: "40.7128",
    longitude: "-74.0060",
    bio: "Focused on natural language processing",
    research_interests: "NLP, Language Models",
    publications: [],
    created_at: "2026-01-08T18:42:54.491Z",
  },
  {
    id: "7je29j08-5717-4562-b3fc-2c963f66afaa",
    full_name: "David Kumar",
    email: "david@example.com",
    lab: "VISION",
    graduation_year: 2020,
    current_company: "Meta",
    current_position: "Senior Researcher",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    linkedin_url: "https://linkedin.com/in/davidkumar",
    latitude: "37.4847",
    longitude: "-122.1477",
    bio: "AR/VR and immersive technologies",
    research_interests: "AR, VR, Metaverse",
    publications: [],
    created_at: "2026-01-08T18:42:54.491Z",
  },
];
