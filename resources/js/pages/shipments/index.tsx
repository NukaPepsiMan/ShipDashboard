import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import { MoreHorizontalIcon } from "lucide-react";


interface Shipment {
    id: number;
    tracking_number: string;
    recipient_name: string;
    address: string;
    weight: number;
    departure_date: string;
    delivery_date: string;
    status: string;
}

interface Props {
    shipments: Shipment[];
}


export default function index({shipments = []}: Props) {



    return (
        <>
            <Head title="Spedizioni"/>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Lista Spedizioni</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tracking number</TableHead>
                                    <TableHead>Destinatario</TableHead>
                                    <TableHead>Indrizzo</TableHead>
                                    <TableHead>Peso</TableHead>
                                    <TableHead>Data di Partenza</TableHead>
                                    <TableHead>Data di Consegna</TableHead>
                                    <TableHead>Stato</TableHead>
                                    <TableHead className="text-right">Azioni</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shipments.map((shipment) => (
                                    <TableRow key={shipment.id}>
                                        <TableCell>{shipment.tracking_number}</TableCell>
                                        <TableCell>{shipment.recipient_name}</TableCell>
                                        <TableCell>{shipment.address}</TableCell>
                                        <TableCell>{shipment.weight}</TableCell>
                                        <TableCell>{shipment.departure_date}</TableCell>
                                        <TableCell>{shipment.delivery_date}</TableCell>
                                        <TableCell>{shipment.status}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontalIcon/>
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Dettaglio</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem variant="destructive">
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {shipments.length === 0 && (
                                    <TableCaption>Nessuna Spedizione Trovata.</TableCaption>
                            )}
                        </Table>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </>
    )
}