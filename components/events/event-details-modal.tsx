"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SecretFriendEvent } from "@/lib/mock/events";

function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function EventDetailsModal({
    open,
    onOpenChange,
    event,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: SecretFriendEvent | null;
}) {
    if (!event) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{event.name}</DialogTitle>
                    {event.description && (
                        <DialogDescription>{event.description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-base">Informações do evento</CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                <span>Sorteio dos nomes: {formatDateTime(event.drawDate)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                <span>Encontro: {formatDateTime(event.meetupDate)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Local: {event.location}</span>
                            </div>

                            <div className="pt-2">
                                {event.isUserInEvent ? (
                                    <Button disabled className="w-full">
                                        Você já está no evento
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            console.log("Entrar no evento", event.id);
                                        }}
                                    >
                                        Entrar no evento
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Users className="h-4 w-4" />
                                Participantes
                            </CardTitle>
                            <DialogDescription>
                                {event.users.length} participante(s)
                            </DialogDescription>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            {event.users.map((u) => (
                                <div
                                    key={u.id}
                                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                                >
                                    <span className="font-medium">{u.name}</span>
                                    {u.nickname && (
                                        <span className="text-muted-foreground">@{u.nickname}</span>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
