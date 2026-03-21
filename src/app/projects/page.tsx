import { redirect } from "next/navigation";

// Projects page redirects to properties listing
// In future, this will be a dedicated projects page with developer projects
export default function ProjectsPage() {
  redirect("/properties");
}
