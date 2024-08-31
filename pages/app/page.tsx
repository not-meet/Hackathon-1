// Replacing the `CardFooter` with a styled div inside the Card component.
"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EventsPage() {
  const events = [
    {
      title: "Navigating Career Crossroads",
      description:
        "Gain insights from industry leaders on making pivotal career decisions, switching fields, and identifying your true professional passions.",
      date: "August 15, 2023",
      venue: "Bangalore International Convention Centre, Bangalore",
      price: "₹1,500",
      image: "/placeholder.svg?height=400&width=600&text=Career+Crossroads",
    },
    {
      title: "Empowering Women in Leadership",
      description:
        "Join successful women leaders as they share their journeys, challenges overcome, and strategies for breaking the glass ceiling in various industries.",
      date: "September 22, 2023",
      venue: "Hyderabad International Convention Centre, Hyderabad",
      price: "₹2,000",
      image: "/placeholder.svg?height=400&width=600&text=Women+Leadership",
    },
    {
      title: "Balancing Ambition and Well-being",
      description:
        "Learn from experts about maintaining work-life balance, managing stress, and achieving holistic success in both personal and professional spheres.",
      date: "October 5, 2023",
      venue: "Jio World Convention Centre, Mumbai",
      price: "₹1,200",
      image: "/placeholder.svg?height=400&width=600&text=Work+Life+Balance",
    },
    {
      title: "Tech Careers of the Future",
      description:
        "Explore emerging tech fields, required skills, and how to position yourself for success in the rapidly evolving technological landscape.",
      date: "November 18, 2023",
      venue: "India Habitat Centre, New Delhi",
      price: "₹1,800",
      image: "/placeholder.svg?height=400&width=600&text=Future+Tech+Careers",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header/>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Guiding+Your+Journey"
            alt="Guiding Your Journey"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center px-4 md:px-6">
              <blockquote className="text-2xl md:text-4xl font-semibold italic text-white mb-4">
                "The greatest good you can do for another is not just to share your riches, but to reveal to him his own."
              </blockquote>
              <footer className="text-lg md:text-xl text-blue-300">— Benjamin Disraeli</footer>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-black dark:text-white">
              Upcoming Events
            </h2>
            <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {events.map((event, index) => (
                <Card key={index} className="flex flex-col overflow-hidden">
                  <Image src={event.image} alt={event.title} width={300} height={200} className="object-cover w-full" />
                  <CardContent className="p-6 flex-1">
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Date:</span> {event.date}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Venue:</span> {event.venue}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Price:</span> {event.price}
                    </p>
                  </CardContent>
                  {/* Custom footer section */}
                  <div className="flex justify-between items-center p-6 bg-gray-100 dark:bg-gray-800">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Register Now</Button>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      Limited Seats
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
