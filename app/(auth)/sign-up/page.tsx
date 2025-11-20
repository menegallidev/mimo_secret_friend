"use client";

import { CpfInput } from "@/components/shared/CpfInput";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
    const [name, setName] = useState("")
    const [nickname, setNickname] = useState("")
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        console.log({ name })
        console.log({ nickname })
        console.log({ cpf })
        console.log({ password })
    }

    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Criar sua conta no Mimo</CardTitle>
                    <CardDescription>
                        Cadastre-se para criar ou participar de grupos de amigo secreto.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nickname">Apelido</Label>
                                <Input
                                    id="nickname"
                                    required
                                    placeholder="Como quer ser chamado no Mimo?"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    required
                                    placeholder="Digite seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cpf">CPF</Label>
                                <CpfInput
                                    id="cpf"
                                    required
                                    value={cpf}
                                    onValueChange={(_formatted, raw) => setCpf(raw)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleSignUp}>
                        Cadastrar
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Já tem uma conta?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                        >
                            Entrar
                        </Link>
                    </span>
                </CardFooter>
            </Card>
        </>
    )
}