import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Head, useForm } from "@inertiajs/react"
import { error } from "console"
import React from "react"


export default function Create(){

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

    const [date, setDate] = React.useState<Date>()

    return (
        <>
            <Head title="Nuova spedizione"/>
            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Crea Nuova Spedizione</CardTitle>
                    </CardHeader>
                    <CardContent>
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

                            <Field>
                                <FieldLabel>Data di partenza</FieldLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">
                                            {date ? date.toLocaleDateString() : "Seleziona una data"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent  className="overflow-visible">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>

                            <Field>
                                <FieldLabel>Data di consegna</FieldLabel>
                            </Field>
                        </FieldGroup>
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
