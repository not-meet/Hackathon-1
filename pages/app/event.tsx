
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
            image: "https://img.freepik.com/free-photo/serious-creative-professionals-studying-project_1262-17525.jpg?t=st=1725066278~exp=1725069878~hmac=a99aff508061e3e99936f6dfcc921dd46d172eac60292a861af6fb8ee5c19649&w=996",
        },
        {
            title: "Empowering Women in Leadership",
            description:
                "Join successful women leaders as they share their journeys, challenges overcome, and strategies for breaking the glass ceiling in various industries.",
            date: "September 22, 2023",
            venue: "Hyderabad International Convention Centre, Hyderabad",
            price: "₹2,000",
            image: "https://img.freepik.com/free-photo/business-women-smiling-each-other_23-2148416422.jpg?t=st=1725066323~exp=1725069923~hmac=2b5307030a9549a9d6f8a7c4223d65a8799c7ba3092a26b0c30e174d60fa1b1a&w=996",
        },
        {
            title: "Balancing Ambition and Well-being",
            description:
                "Learn from experts about maintaining work-life balance, managing stress, and achieving holistic success in both personal and professional spheres.",
            date: "October 5, 2023",
            venue: "Jio World Convention Centre, Mumbai",
            price: "₹1,200",
            image: "https://img.freepik.com/free-photo/group-adult-men-working-office_23-2148483881.jpg?t=st=1725066353~exp=1725069953~hmac=fa2d3676ee9935d3a7eb662fd3c87ac0a3605bc0e4f61c2ff77b4c749b288540&w=826",
        },
        {
            title: "Tech Careers of the Future",
            description:
                "Explore emerging tech fields, required skills, and how to position yourself for success in the rapidly evolving technological landscape.",
            date: "November 18, 2023",
            venue: "India Habitat Centre, New Delhi",
            price: "₹1,800",
            image: "https://img.freepik.com/premium-photo/customer-relationship-management-system-modish-computer-crm-business-enterprise_31965-208109.jpg?w=1060",
        },
        {
            title: "Tech Careers of the Future",
            description:
                "Explore emerging tech fields, required skills, and how to position yourself for success in the rapidly evolving technological landscape.",
            date: "November 18, 2023",
            venue: "India Habitat Centre, New Delhi",
            price: "₹1,800",
            image: "https://img.freepik.com/free-psd/new-year-celebration-post-social-media-template_505751-4866.jpg?semt=ais_hybrid    ",
        },
        {
            title: "Tech Careers of the Future",
            description:
                "Explore emerging tech fields, required skills, and how to position yourself for success in the rapidly evolving technological landscape.",
            date: "November 18, 2023",
            venue: "India Habitat Centre, New Delhi",
            price: "₹1,800",
            image: "https://img.freepik.com/free-vector/elegant-event-party-banner-with-black-splash_1361-2171.jpg?semt=ais_hybrid",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1">
                <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
                    <Image
                        src="https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?semt=ais_hybrid"
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
            <Footer />
        </div>
    );
}
