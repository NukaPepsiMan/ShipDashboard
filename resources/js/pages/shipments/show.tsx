import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";

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

export default function show({shipment}: Shipment){

    return(
        <>
            <Head title={shipment.tracking_number}/>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Dettaglio Spedizione</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </>
    )
}