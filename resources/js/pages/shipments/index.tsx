import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Head, router } from "@inertiajs/react";
import { CalendarIcon, MoreHorizontalIcon, PackageIcon, SearchIcon, TrashIcon } from "lucide-react";


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

const enumStatus = [
    "In Attesa",
    "In Transito",
    "Cancellato",
    "Consegnato"
  ] as const


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
                        <FieldGroup>
                            <Field orientation={"horizontal"}>
                                <Field className="max-w-full">
                                    <InputGroup>
                                        <InputGroupInput id="inline-start-input" placeholder="Cerca per tracking, destinatario o indirizzo..." />
                                        <InputGroupAddon align="inline-start">
                                        <SearchIcon className="text-muted-foreground" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field className="max-w-1/8">
                                    <Combobox items={enumStatus}>
                                        <ComboboxInput placeholder="Seleziona stato" showClear />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item} value={item}>
                                                {item}
                                                </ComboboxItem>
                                            )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </Field>
                                <Field className="max-w-1/8">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="departure_date"
                                                className="justify-start font-normal"
                                            >
                                                <CalendarIcon /> Filtra Partenza
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={new Date()}
                                                captionLayout="dropdown"
                                                required
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                                <Field className="max-w-1/8">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="delivery_date"
                                                className="justify-start font-normal"
                                            >
                                                <CalendarIcon /> Filtra Consegna
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            <Calendar
                                                mode="single"
                                                selected={new Date()}
                                                captionLayout="dropdown"
                                                required
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                            </Field>
                            
                        </FieldGroup>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tracking Number</TableHead>
                                    <TableHead>Destinatario</TableHead>
                                    <TableHead>Indirizzo</TableHead>
                                    <TableHead>Peso(Kg)</TableHead>
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
                                                        <DropdownMenuItem
                                                            onClick={() => router.get('/shipments/' + shipment.id)}
                                                        >
                                                            <PackageIcon/>Dettaglio
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem 
                                                            variant="destructive"
                                                            onClick={() => router.delete('/shipments/'+ shipment.id)}>
                                                            <TrashIcon/>Delete
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