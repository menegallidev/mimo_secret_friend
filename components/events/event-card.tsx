import { CalendarDays, MapPin, Users, Pencil } from "lucide-react";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SecretFriendEvent } from "@/lib/mock/events";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function EventCard({
    event,
    onViewDetails,
    isAdmin = false,
    onEditEvent,
}: {
    event: SecretFriendEvent;
    onViewDetails: (event: SecretFriendEvent) => void;
    isAdmin?: boolean;
    onEditEvent?: (event: SecretFriendEvent) => void;
}) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">{event.name}</CardTitle>
                {event.description && (
                    <CardDescription className="line-clamp-2">
                        {event.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Sorteio: {formatDate(event.drawDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Encontro: {formatDate(event.meetupDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.users.length} participante(s)</span>
                </div>
            </CardContent>

            <CardFooter className="mt-auto flex justify-end gap-2">
                {isAdmin && (
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Editar evento"
                        onClick={() => onEditEvent?.(event)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}

                <Button variant="outline" onClick={() => onViewDetails(event)}>
                    Ver detalhes
                </Button>
            </CardFooter>
        </Card>
    );
}
