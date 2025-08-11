import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_31acjwn",     // ✅ replace this
        "template_ca2db4h",    // ✅ replace this
        formRef.current,
        "tc2xACodijJuF6Xcf"       // ✅ replace this
      )
      .then(() => {
        toast.success("Thank you for your message! We'll get back to you soon.");
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send the message. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need assistance? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {/* ✅ ADDED formRef and name attributes */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" placeholder="Your department at Aiden AI" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What's this about?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & FAQs (unchanged) */}
          <div className="space-y-8">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">hr_aiden@aidenai.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">+91 9096778388</p>
                  </div>
                </div>

                <div className="flex items-top space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Pune Office Address</p>
                    <p className="text-muted-foreground">
                      3rd Floor,S No 52, Baner Business Bay, <br />
                      Baner-Sus Road,Behind Audi, Off Mumbai Banglore Highway,<br />
                      Baner Pune 411045
                    </p>
                    <br />
                  </div>
                </div>

                <div className="flex items-top space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />

                  <div>

                    <p className="font-semibold">Hyderabad Office Address</p>
                    <p className="text-muted-foreground">

                      Urban Desk, 3rd Floor,Gowra Palladium, <br />
                      Raidurg,Hyderabad - 500081
                    </p>
                  </div>
                </div>
                {/* 
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Store Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">How long does delivery take?</p>
                  <p className="text-muted-foreground text-sm">
                    Standard delivery takes 3-5 business days within India.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Can I return items?</p>
                  <p className="text-muted-foreground text-sm">
                    Yes, we accept returns within 30 days of purchase for unused items.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Do you offer bulk discounts?</p>
                  <p className="text-muted-foreground text-sm">
                    Yes, contact us for special pricing on bulk orders for team events.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">How can I track my order?</p>
                  <p className="text-muted-foreground text-sm">
                    Once your order is shipped, you’ll receive a tracking link via email or SMS.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Can I cancel or modify my order?</p>
                  <p className="text-muted-foreground text-sm">
                    You can cancel or update your order within 2 hours of placing it. Contact support for help.
                  </p>
                </div>

                {/* <div>
      <p className="font-semibold">Do you ship internationally?</p>
      <p className="text-muted-foreground text-sm">
        Currently, we only deliver within India. International shipping will be added soon.
      </p>
    </div> */}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
