import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/home";

export const Route = createFileRoute("/")({ component: Home });
