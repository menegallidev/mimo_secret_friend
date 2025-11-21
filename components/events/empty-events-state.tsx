import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyEventsState() {
    return (
        <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <Gift className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-medium">Nenhum evento por aqui</p>
                    <p className="text-sm text-muted-foreground">
                        Quando você for adicionado a um amigo secreto, ele vai aparecer aqui.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
