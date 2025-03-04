import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    
    document.body.appendChild(script);
    
    // Load reCAPTCHA script
    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    recaptchaScript.async = true;
    document.body.appendChild(recaptchaScript);
    
    return () => {
      // Cleanup function to remove the scripts when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(recaptchaScript)) {
        document.body.removeChild(recaptchaScript);
      }
    };
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Get the reCAPTCHA token
      // For test purposes, we'll use a simple approach - in production you'd want to use refs
      const recaptchaToken = (window as any).grecaptcha?.getResponse() || '';
      
      if (!recaptchaToken) {
        toast({
          title: "Verification required",
          description: "Please complete the reCAPTCHA verification before submitting.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Send the data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
        // Reset reCAPTCHA
        try {
          (window as any).grecaptcha?.reset();
        } catch (e) {
          console.error("Error resetting reCAPTCHA:", e);
        }
        // Set submitted state to show success message
        setFormSubmitted(true);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12 pt-16">
      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <Mail className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold">Message sent!</h3>
                <p className="text-muted-foreground max-w-md">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFormSubmitted(false)} 
                  className="mt-6"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Google reCAPTCHA */}
                  <div className="flex justify-center my-4">
                    <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full font-bold py-6 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Feel free to reach out through any of these channels.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">prateek@edoflip.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Schedule a Meeting</CardTitle>
            <CardDescription>
              Book a time slot directly on my calendar for a personal conversation.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendly inline widget */}
          <div className="calendly-inline-widget" data-url="https://calendly.com/prateekh/30min?hide_gdpr_banner=1" style={{minWidth: "320px", height: "700px"}}></div>
        </CardContent>
      </Card>
    </div>
  );
}
