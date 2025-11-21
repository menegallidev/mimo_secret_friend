import { DashboardClient } from "./components/dashboard-client";
import { mockEvents } from "@/lib/mock/events";

export default function DashboardPage() {
    const events = mockEvents;

    return <DashboardClient events={events} />;
}
