"use client";

import { useMemo, useState } from "react";
import { User, Pencil, Save, X, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CpfInput } from "@/components/shared/CpfInput";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type Profile = {
    id: string;
    name: string;
    nickname: string;
    cpf: string;
};

const mockProfile: Profile = {
    id: "u1",
    name: "Rafael Menegalli",
    nickname: "Rafa",
    cpf: "12345678910",
};

export function ProfileClient() {
    const [profile, setProfile] = useState<Profile>(mockProfile);
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        name: profile.name,
        nickname: profile.nickname,
        cpf: profile.cpf,
        password: "",
    });

    const initials = useMemo(() => {
        const parts = profile.name.trim().split(" ");
        return (parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "");
    }, [profile.name]);

    function startEdit() {
        setForm({
            name: profile.name,
            nickname: profile.nickname,
            cpf: profile.cpf,
            password: "",
        });
        setIsEditing(true);
    }

    function cancelEdit() {
        setIsEditing(false);
    }

    async function saveEdit() {
        setProfile((prev) => ({
            ...prev,
            name: form.name.trim(),
            nickname: form.nickname.trim(),
        }));

        setIsEditing(false);
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="icon" aria-label="Voltar">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Meu perfil</h1>
                        {/* <p className="text-sm text-muted-foreground">
                            Veja e edite suas informações.
                        </p> */}
                    </div>
                </div>

                {!isEditing ? (
                    <Button onClick={startEdit} variant="outline" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Editar
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={cancelEdit} variant="ghost" className="gap-2">
                            <X className="h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button onClick={saveEdit} className="gap-2">
                            <Save className="h-4 w-4" />
                            Salvar
                        </Button>
                    </div>
                )}
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-14 w-14 border">
                            <AvatarFallback className="text-base font-semibold">
                                {initials || "MI"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <CardTitle className="text-lg leading-tight">
                                {profile.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                @{profile.nickname}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground">
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium text-foreground">CPF:</span>{" "}
                                {profile.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Informações</CardTitle>
                        <CardDescription>
                            {isEditing
                                ? "Edite seus dados e salve as alterações."
                                : "Seus dados cadastrados no Mimo."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                disabled={!isEditing}
                                value={form.name}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nickname">Apelido</Label>
                            <Input
                                id="nickname"
                                disabled={!isEditing}
                                value={form.nickname}
                                onChange={(e) => setForm((f) => ({ ...f, nickname: e.target.value }))}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <CpfInput
                                id="cpf"
                                disabled
                                value={form.cpf}
                                onValueChange={(_, raw) => setForm((f) => ({ ...f, cpf: raw }))}
                            />
                            <p className="text-xs text-muted-foreground">
                                CPF não pode ser alterado.
                            </p>
                        </div>

                        {isEditing && (
                            <>
                                <Separator />
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Nova senha (opcional)</Label>
                                    <PasswordInput
                                        id="password"
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, password: e.target.value }))
                                        }
                                        placeholder="Digite uma nova senha"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Deixe em branco para manter a senha atual.
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
