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
import { format, parse } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, MoreHorizontalIcon, PackageIcon, SearchIcon, TrashIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
    filters: {
        search: string;
        status: string;
        departure_date: string;
        delivery_date: string;
    }
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

export default function index({shipments = [], filters}: Props) {

    const [searchTerm, setSearchTerm] = useState(filters?.search || null);
    const [statusFilter, setStatusFilter] = useState(filters?.status || null);
    const [departureDate, setDepartureDate] = useState(filters?.departure_date ? parse(filters.departure_date, 'yyyy-MM-dd', new Date()) : undefined);
    const [deliveryDate, setDeliveryDate] = useState(filters?.delivery_date ? parse(filters.delivery_date, 'yyyy-MM-dd', new Date()) : undefined);


    useEffect(() => {
        router.get('/shipments',
             {
                 search: searchTerm, 
                 status: statusFilter,
                 departure_date: departureDate ? format(departureDate, 'yyyy-MM-dd') : null,
                 delivery_date: deliveryDate ? format(deliveryDate, 'yyyy-MM-dd') : null
             }, 
             {preserveState: true, replace: true, preserveScroll: true});
    }, [searchTerm, statusFilter, departureDate, deliveryDate]);

    return (
        <>
            <Head title="Spedizioni"/>
            <div className="p-8 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Lista Spedizioni</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field orientation={"horizontal"}>
                                <Field className="max-w-full">
                                    <InputGroup>
                                        <InputGroupInput 
                                            id="inline-start-input" 
                                            placeholder="Cerca per tracking, destinatario o indirizzo..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <InputGroupAddon align="inline-start">
                                        <SearchIcon className="text-muted-foreground" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field className="max-w-1/8">
                                    <Combobox 
                                        items={statusOptions}
                                        value={statusFilter}
                                        onValueChange={(e) => setStatusFilter(e)}
                                    >
                                        <ComboboxInput placeholder="Seleziona stato" showClear />
                                        <ComboboxContent>
                                            <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item.value} value={item}>
                                                {item.label}
                                                </ComboboxItem>
                                            )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </Field>
                                <Field className="w-auto">
                                    <div className="flex items-center gap-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="departure_date"
                                                    className="justify-start font-normal"
                                                >
                                                    <CalendarIcon /> {departureDate ? format(departureDate, 'PPP', {locale: it}) : "Filtra partenza"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={departureDate}
                                                    onSelect={setDepartureDate}
                                                    captionLayout="dropdown"
                                                    locale={it}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {departureDate && (
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-muted-foreground hover:text-foreground"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDepartureDate(undefined);
                                                }}
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Field>
                                <Field className="w-auto">
                                    <div className="flex items-center gap-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="delivery_date"
                                                    className="justify-start font-normal"
                                                >
                                                    <CalendarIcon /> {deliveryDate ? format(deliveryDate, 'PPP', {locale: it}) : "Filtra consegna"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent >
                                                <Calendar
                                                    mode="single"
                                                    selected={deliveryDate}
                                                    onSelect={setDeliveryDate}
                                                    captionLayout="dropdown"
                                                    locale={it}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {deliveryDate && (
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-muted-foreground hover:text-foreground"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDeliveryDate(undefined);
                                                }}
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
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
                                        <TableCell>{shipment.departure_date ? format(new Date(shipment.departure_date), 'PPP', {locale: it}) : ''}</TableCell>
                                        <TableCell>{shipment.delivery_date ? format(new Date(shipment.delivery_date), 'PPP', {locale: it}) : ''}</TableCell>
                                        <TableCell>{getStatusLabel(shipment.status)}</TableCell>
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