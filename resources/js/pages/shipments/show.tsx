import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface TrackingEvent {
    id: number;
    location: string;
    description: string;
    event_time: string;
}

interface Shipment {
    id: number;
    tracking_number: string;
    recipient_name: string;
    address: string;
    weight: number;
    departure_date: string;
    delivery_date: string;
    status: string;
    tracking_events?: TrackingEvent[];
}

const statusOptions = [
    { value: "pending", label: "In Attesa" },
    { value: "in_transit", label: "In Transito" },
    { value: "cancelled", label: "Cancellato" },
    { value: "delivered", label: "Consegnato" }
]

const getStatusLabel = (status: string) => {
    return statusOptions.find(o => o.value === status)?.label || status;
}

export default function show({shipment}: {shipment: Shipment}){

    return(
        <>
            <Head title={`Spedizione ${shipment.tracking_number}`}/>
            <div className="p-8 space-y-6">
                <Card className="mx-auto max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Dettaglio Spedizione</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Tracking Number</p>
                                <p className="text-sm font-medium leading-none">{shipment.tracking_number}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Stato</p>
                                <p className="text-sm font-medium leading-none">{getStatusLabel(shipment.status)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Destinatario</p>
                                <p className="text-sm font-medium leading-none">{shipment.recipient_name}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Indirizzo</p>
                                <p className="text-sm font-medium leading-none whitespace-pre-wrap">{shipment.address}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Peso (Kg)</p>
                                <p className="text-sm font-medium leading-none">{shipment.weight}</p>
                            </div>
                            <div className="hidden md:block"></div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Data Partenza</p>
                                <p className="text-sm font-medium leading-none">{shipment.departure_date ? format(new Date(shipment.departure_date), 'PPP', {locale: it}) : '-'}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">Data Consegna</p>
                                <p className="text-sm font-medium leading-none">{shipment.delivery_date ? format(new Date(shipment.delivery_date), 'PPP', {locale: it}) : '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mx-auto max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-xl">Eventi di Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data e Ora</TableHead>
                                    <TableHead>Luogo</TableHead>
                                    <TableHead>Descrizione</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shipment.tracking_events && shipment.tracking_events.length > 0 ? (
                                    shipment.tracking_events.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell className="whitespace-nowrap">{format(new Date(event.event_time), 'PPp', {locale: it})}</TableCell>
                                            <TableCell>{event.location}</TableCell>
                                            <TableCell>{event.description}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                            Nessun evento registrato per questa spedizione.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}