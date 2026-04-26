import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Head, Link, useForm } from "@inertiajs/react"
import {format} from 'date-fns'
import {it} from 'date-fns/locale'
import { error } from "console"
import { CalendarIcon } from "lucide-react"


export default function create(){

    const {data, setData, post, processing, errors} = useForm({
        recipient_name: '',
        address: '',
        weight: '',
        departure_date: '',
        delivery_date: '',
        status: 'pending'
    })

    const submit = (e: any) => {
        e.preventDefault();
        post('/shipments');
    }

    const parseDate = (dateString: string) => {
        return dateString ? new Date(dateString) : undefined;
    }

    const formatDate = (date: Date | undefined) => {
        return date ? format(date, 'yyyy-MM-dd') : '';
    }

    const displayDate = (dateString: string) => {
        return dateString ? format(new Date(dateString), "PPP", {locale: it}) : <span>Seleziona una data</span>;
    }

    return (
        <>
            <Head title="Nuova spedizione"/>
            <div className="p-8">
                <Card className=" mx-auto max-w-2xl gap-4">
                    <CardHeader>
                        <CardTitle className="text-2xl">Crea Nuova Spedizione</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="create-shipment-form" onSubmit={submit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Nome Destinatario</FieldLabel>
                                    <Input 
                                        id="recipient_name" 
                                        type="text" 
                                        value={data.recipient_name}
                                        onChange={e => setData('recipient_name', e.target.value)}
                                        required
                                        />
                                    <InputError message={errors.recipient_name}/>
                                </Field>
                                <Field>
                                    <FieldLabel>Indrizzo</FieldLabel>
                                    <Input 
                                        id="address" 
                                        type="text" 
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        required
                                        />
                                    <InputError message={errors.address}/>
                                </Field>
                                <Field>
                                    <FieldLabel>Peso (Kg)</FieldLabel>
                                    <Input 
                                        id="weight" 
                                        type="number"
                                        step="0.1" 
                                        value={data.weight}
                                        onChange={e => setData('weight', e.target.value)}
                                        required
                                        />
                                    <InputError message={errors.weight}/>
                                </Field>
                                <Field orientation="horizontal">
                                    <Field>
                                        <FieldLabel>Data di partenza</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="departure_date"
                                                    className="justify-start font-normal"
                                                >
                                                    <CalendarIcon />
                                                    {displayDate(data.departure_date)}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={parseDate(data.departure_date)}
                                                    onSelect={(date) => setData('departure_date', formatDate(date))}
                                                    captionLayout="dropdown"
                                                    required
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.departure_date}/>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Data di consegna</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="delivery_date"
                                                    className="justify-start font-normal"
                                                >
                                                    <CalendarIcon />
                                                    {displayDate(data.delivery_date)}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent >
                                                <Calendar
                                                    mode="single"
                                                    selected={parseDate(data.delivery_date)}
                                                    onSelect={(date) => setData('delivery_date', formatDate(date))}
                                                    locale={it}
                                                    captionLayout="dropdown"
                                                    required
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.delivery_date}/>
                                    </Field>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-end pt-4 gap-4">
                        <Button variant="outline" asChild>
                           <Link href="/shipments">Annulla</Link>  
                        </Button>
                        <Button type="submit" form="create-shipment-form" disabled={processing}>
                            Crea Spedizone
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
