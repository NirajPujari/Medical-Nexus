import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Stethoscope, Activity, ShieldPlus, ChevronRight } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: <HeartPulse className="h-8 w-8 text-primary"/>, title: "Cardiology", desc: "Expert care for your heart with advanced diagnostic tools and personalized treatment plans." },
    { icon: <Stethoscope className="h-8 w-8 text-primary"/>, title: "Primary Care", desc: "Comprehensive healthcare for patients of all ages, from infants to seniors." },
    { icon: <Activity className="h-8 w-8 text-primary"/>, title: "Neurology", desc: "Specialized treatment for brain, spinal cord, and peripheral nerve disorders." },
    { icon: <ShieldPlus className="h-8 w-8 text-primary"/>, title: "Orthopedics", desc: "Advanced care for bone, joint, and muscle and ligament injuries." },
    { icon: <Activity className="h-8 w-8 text-primary"/>, title: "Diagnostics", desc: "Cutting-edge imaging and lab tests for accurate and timely medical insights." },
    { icon: <Stethoscope className="h-8 w-8 text-primary"/>, title: "Pediatrics", desc: "Compassionate healthcare dedicated to the physical and emotional well-being of children." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Specialized Services</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We offer a wide range of medical specialties staffed by industry-leading professionals 
          dedicated to your health and recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, i) => (
          <Card key={i} className="group border border-border bg-surface hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="p-4 bg-primary-soft w-max rounded-2xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {item.icon}
              </div>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{item.desc}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="p-0 hover:bg-transparent text-primary font-bold flex items-center group-hover:translate-x-1 transition-transform">
                Read Detailed Services <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
