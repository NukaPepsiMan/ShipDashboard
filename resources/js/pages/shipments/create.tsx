import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Head } from "@inertiajs/react"


export default function Create(){
    return (
        <>
            <Head title="Nuova spedizione"/>
            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Crea Nuova Spedizione</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label>Nome Destinatario</Label>
                        </div>
                        <div>
                            <Label>Indirizzo</Label>
                        </div>
                        <div>
                            <Label>Peso (kg)</Label>
                        </div>
                        <div>
                            <Label>Data di consegna</Label>
                        </div>
                        
                        <div>
                            <Label>Data di consegna</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Annulla</Button>
                        <Button>Crea</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
