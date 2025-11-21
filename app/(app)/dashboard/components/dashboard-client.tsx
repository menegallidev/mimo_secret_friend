"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/event-card";
import { EmptyEventsState } from "@/components/events/empty-events-state";
import { EventDetailsModal } from "@/components/events/event-details-modal";
import type { SecretFriendEvent } from "@/lib/mock/events";
import { useRouter } from "next/navigation";

export function DashboardClient({ events }: { events: SecretFriendEvent[] }) {
    const router = useRouter();
    const [selectedEvent, setSelectedEvent] = useState<SecretFriendEvent | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const hasEvents = useMemo(() => events.length > 0, [events.length]);

    function handleViewDetails(event: SecretFriendEvent) {
        setSelectedEvent(event);
        setOpenModal(true);
    }

    function handleEditEvent(event: SecretFriendEvent) {
        router.push(`/events/edit?id=${event.id}`);
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold tracking-tight">Seus eventos</h1>
                <p className="text-sm text-muted-foreground">
                    Aqui estão os amigos secretos em que você está incluído.
                </p>
            </header>

            {!hasEvents ? (
                <EmptyEventsState />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard
                            event={event}
                            onViewDetails={handleViewDetails}
                            isAdmin={true}
                            onEditEvent={handleEditEvent}
                        />
                    ))}
                </div>
            )}

            <EventDetailsModal
                open={openModal}
                onOpenChange={setOpenModal}
                event={selectedEvent}
            />
        </div>
    );
}
