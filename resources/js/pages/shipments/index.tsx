import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Head } from "@inertiajs/react";



export default function index() {



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
                                <TableRow>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell className="text-right">-</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </>
    )
}