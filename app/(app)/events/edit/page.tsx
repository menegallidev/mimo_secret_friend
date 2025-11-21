"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, X, Trash2 } from "lucide-react";
import { mockEvents } from "@/lib/mock/events";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


type UserOption = {
    id: string;
    name: string;
    nickname?: string;
};

const mockUsers: UserOption[] = [
    { id: "u1", name: "Rafael Menegalli", nickname: "Rafa" },
    { id: "u2", name: "Ana Paula", nickname: "Aninha" },
    { id: "u3", name: "João Victor" },
    { id: "u4", name: "Luana Costa" },
];

export default function EditEventPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get("id");

    const event = useMemo(
        () => mockEvents.find(e => e.id === eventId),
        [eventId]
    );

    const [name, setName] = useState(event?.name ?? "");
    const [description, setDescription] = useState(event?.description ?? "");
    const [drawDate, setDrawDate] = useState(event?.drawDate ? event.drawDate.slice(0, 16) : "");
    const [meetupDate, setMeetupDate] = useState(event?.meetupDate ? event.meetupDate.slice(0, 16) : "");
    const [location, setLocation] = useState(event?.location ?? "");

    const [participants, setParticipants] = useState<UserOption[]>(
        event?.users ?? []
    );
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const availableUsers = useMemo(
        () => mockUsers.filter(u => !participants.some(p => p.id === u.id)),
        [participants]
    );

    if (!eventId || !event) {
        return (
            <div className="mx-auto w-full max-w-2xl space-y-4">
                <header className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="icon" aria-label="Voltar">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Editar evento</h1>
                        <p className="text-sm text-muted-foreground">Evento não encontrado.</p>
                    </div>
                </header>
                <Card>
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        Volte para o dashboard e tente novamente.
                    </CardContent>
                </Card>
            </div>
        );
    }

    const canSubmit =
        name.trim().length > 0 &&
        drawDate.length > 0 &&
        meetupDate.length > 0 &&
        location.trim().length > 0 &&
        participants.length > 0;

    const handleAddParticipant = (userId: string) => {
        const user = mockUsers.find(u => u.id === userId);
        if (!user) return;
        setParticipants(prev => [...prev, user]);
        setSelectedUserId("");
    };

    const handleRemoveParticipant = (userId: string) => {
        setParticipants(prev => prev.filter(p => p.id !== userId));
    };

    const handleDelete = async () => {
        setLoading(true);

        const payload = { id: eventId };
        console.log("delete-event", payload);

        setLoading(false);
        router.push("/dashboard");
    };


    const handleSave = async () => {
        if (!canSubmit) return;

        setLoading(true);

        const payload = {
            id: eventId,
            name: name.trim(),
            description: description.trim(),
            drawDate,
            meetupDate,
            location: location.trim(),
            participants: participants.map(p => p.id),
        };

        console.log("update-event", payload);

        setLoading(false);
        router.push("/dashboard");
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6">
            <header className="flex items-center gap-3">
                <Button asChild variant="ghost" size="icon" aria-label="Voltar">
                    <Link href="/dashboard">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Editar evento</h1>
                    <p className="text-sm text-muted-foreground">
                        Atualize as informações do amigo secreto.
                    </p>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do evento</CardTitle>
                    <CardDescription>
                        Ajuste as informações principais e participantes.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome do evento</Label>
                        <Input
                            id="name"
                            placeholder="Ex.: Natal da Firma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Descreva o evento e regras, se quiser"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="drawDate">Data do sorteio</Label>
                            <Input
                                id="drawDate"
                                type="datetime-local"
                                value={drawDate}
                                onChange={(e) => setDrawDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meetupDate">Data do encontro</Label>
                            <Input
                                id="meetupDate"
                                type="datetime-local"
                                value={meetupDate}
                                onChange={(e) => setMeetupDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Local do encontro</Label>
                        <Input
                            id="location"
                            placeholder="Ex.: Casa do João, Rua X, 123"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Participantes</Label>

                        <Select
                            value={selectedUserId}
                            onValueChange={(value) => {
                                setSelectedUserId(value);
                                handleAddParticipant(value);
                            }}
                            disabled={availableUsers.length === 0}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um participante" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableUsers.map((u) => (
                                    <SelectItem key={u.id} value={u.id}>
                                        {u.name}{u.nickname ? ` (@${u.nickname})` : ""}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {participants.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                Nenhum participante selecionado.
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {participants.map((p) => (
                                    <Badge key={p.id} variant="secondary" className="gap-1 pr-1">
                                        <span>{p.name}{p.nickname ? ` (@${p.nickname})` : ""}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveParticipant(p.id)}
                                            className="rounded-sm p-0.5 hover:bg-muted"
                                            aria-label={`Remover ${p.name}`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={loading}
                                className="w-full sm:w-auto gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Excluir evento
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Excluir evento</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tem certeza que deseja excluir este evento? Essa ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Excluir
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button
                        onClick={handleSave}
                        disabled={!canSubmit || loading}
                        className="w-full sm:w-auto gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {loading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
