"use client";

import { CpfInput } from "@/components/shared/CpfInput";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({ cpf })
        console.log({ password })
    }

    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Entrar no Mimo</CardTitle>
                    <CardDescription>
                        Acesse sua conta para participar dos sorteios de amigo secreto.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
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
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                        Entrar
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Não tem uma conta?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                        >
                            Cadastre-se
                        </Link>
                    </span>
                </CardFooter>
            </Card>
        </>
    )
}