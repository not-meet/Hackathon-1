import React from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#0B090A] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MentorConnect</h3>
                        <p className="text-sm">Connecting mentors and learners for a brighter future.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-[#E5383B] transition-colors">Home</Link></li>
                            <li><Link href="/seminars" className="hover:text-[#E5383B] transition-colors">Seminars</Link></li>
                            <li><Link href="/courses" className="hover:text-[#E5383B] transition-colors">Courses</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#E5383B] transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm">123 Learning Street</p>
                        <p className="text-sm">Education City, ED 12345</p>
                        <p className="text-sm">Phone: (123) 456-7890</p>
                        <p className="text-sm">Email: info@mentorconnect.com</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#E5383B] transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-[#E5383B] transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-[#E5383B] transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-[#E5383B] transition-colors"><Linkedin size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm">&copy; 2023 MentorConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}