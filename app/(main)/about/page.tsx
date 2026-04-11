import { Separator } from "@/components/ui/separator";
import { Activity, ShieldCheck, Heart, UserCheck } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: <Heart className="h-6 w-6 text-primary"/>, title: "Compassion", desc: "We provide care with empathy and respect for every individual's journey." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary"/>, title: "Integrity", desc: "Honesty and ethical behavior are at the core of our medical practice." },
    { icon: <Activity className="h-6 w-6 text-primary"/>, title: "Excellence", desc: "We strive for the highest standards in everything we do, from basic care to complex surgery." },
    { icon: <UserCheck className="h-6 w-6 text-primary"/>, title: "Patient-First", desc: "Your health and comfort are the primary focus of our entire team." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-soft py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8">About Medical Nexus</h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Since 1998, Medical Nexus has been a cornerstone of the medical community, 
            combining state-of-the-art technology with a deeply human approach to healthcare.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              What started as a small clinic has grown into a world-class general hospital. 
              Over the last two decades, we have expanded our facilities to include specialized 
              wings for cardiology, neurosurgery, and advanced diagnostics.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Despite our growth, our core mission has never changed: to provide advanced 
              medical care accessible to everyone, delivered with a personal touch that treats 
              every patient like family.
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl bg-muted/20 flex items-center justify-center border-2 border-dashed border-muted overflow-hidden">
             <Activity className="h-24 w-24 text-primary/20" />
             <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent"></div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Values Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Values</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide our staff every single day.</p>
        </div>
        <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl border border-border bg-background hover:border-primary transition-colors">
              <div className="p-3 bg-primary-soft rounded-full mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
