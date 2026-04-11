import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DoctorsPage() {
  const doctors = [
    { name: "Dr. Sarah Jenkins", spec: "Cardiology", rating: 5, img: "SJ", bio: "Board-certified cardiologist with over 15 years of experience in interventional cardiology." },
    { name: "Dr. Marcus Chen", spec: "Neurology", rating: 5, img: "MC", bio: "Leading researcher in neuroplasticity and specialist in complex brain surgery." },
    { name: "Dr. Emily Rostova", spec: "Pediatrics", rating: 5, img: "ER", bio: "Dedicated to providing compassionate care for children and adolescents for a decade." },
    { name: "Dr. James Wilson", spec: "Orthopedics", rating: 5, img: "JW", bio: "Expert in sports medicine and minimally invasive orthopedic procedures." },
    { name: "Dr. Elena Gilbert", spec: "Diagnostics", rating: 5, img: "EG", bio: "Specialist in radiology and nuclear medicine with a focus on early detection." },
    { name: "Dr. Robert Smith", spec: "Primary Care", rating: 5, img: "RS", bio: "Family physician focusing on preventative care and long-term health management." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Medical Team</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          World-class experts from across the globe, united by a single mission: 
          providing the best possible care for every patient.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {doctors.map((doc, i) => (
          <Card key={i} className="border-border bg-surface hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
            <CardHeader className="flex flex-col items-center text-center pt-8">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary-soft shadow-sm">
                <AvatarImage src="" alt={doc.name} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">{doc.img}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-bold">{doc.name}</CardTitle>
              <Badge variant="secondary" className="mt-2 px-3 py-1 font-semibold">{doc.spec}</Badge>
            </CardHeader>
            <CardContent className="text-center pb-6 flex-1">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                {doc.bio}
              </p>
              <div className="text-accent text-sm tracking-widest">
                {'★'.repeat(doc.rating)}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/5 p-4 mt-auto">
              <Button className="w-full font-bold">Book a Consultation</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
