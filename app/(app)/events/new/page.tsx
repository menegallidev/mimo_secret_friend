"use client";

import { useMemo, useState } from "react";
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
import { ArrowLeft, CalendarPlus, X } from "lucide-react";

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

export default function NewEventPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [drawDate, setDrawDate] = useState("");
    const [meetupDate, setMeetupDate] = useState("");
    const [location, setLocation] = useState("");
    const [participants, setParticipants] = useState<UserOption[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const availableUsers = useMemo(
        () => mockUsers.filter(u => !participants.some(p => p.id === u.id)),
        [participants]
    );

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

    const handleCreate = async () => {
        if (!canSubmit) return;

        setLoading(true);

        const payload = {
            name: name.trim(),
            description: description.trim(),
            drawDate,
            meetupDate,
            location: location.trim(),
            participants: participants.map(p => p.id),
        };

        console.log("create-event", payload);

        setLoading(false);
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
                    <h1 className="text-2xl font-bold tracking-tight">Criar evento</h1>
                    <p className="text-sm text-muted-foreground">
                        Configure um novo amigo secreto para seus participantes.
                    </p>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do evento</CardTitle>
                    <CardDescription>
                        Preencha as informações principais do amigo secreto.
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
                                Nenhum participante selecionado ainda.
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

                <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button
                        onClick={handleCreate}
                        disabled={!canSubmit || loading}
                        className="w-full sm:w-auto gap-2"
                    >
                        <CalendarPlus className="h-4 w-4" />
                        {loading ? "Criando..." : "Criar evento"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
