import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 bg-secondary z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-white">
                    <X size={24} />
                </button>
            </div>
            <nav className="flex flex-col items-center">
                <Link href="/app/findMentor" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Find a Mentor</Link>
                <Link href="/app/login" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Become a Mentor</Link>
                <Link href="/app/seminars" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Seminars</Link>
                <Link href="/app/cources" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Courses</Link>
                <Link href="/app/events" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Events</Link>
                <Link href="/app/opportunities" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Opportunities</Link>
                <Link href="/app/blog" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Blog</Link>
                <Link href="/app/library" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Library</Link>
                <Link href="/app/pricing" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Pricing</Link>
                <Link href="/app/login" className="text-white py-2 hover:text-primary transition-colors" onClick={onClose}>Sign Up</Link>
            </nav>
        </div>
    )
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header className="bg-slate-50 text-white py-4 sticky top-0 z-20 shadow-xl">
            <div className="container mx-auto flex justify-between items-center text-black ">
                <h1 className="text-2xl font-bold text-black">MentorConnect</h1>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li><Link href="/app/findMentor" className="hover:text-primary transition-colors">Find a Mentor</Link></li>
                        <li><Link href="/app/login" className="hover:text-primary transition-colors">Become a Mentor</Link></li>
                        <li><Link href="/app/seminars" className="hover:text-primary transition-colors">Seminars</Link></li>
                        <li><Link href="/app/cources" className="hover:text-primary transition-colors">Courses</Link></li>
                        <li><Link href="/app/events" className="hover:text-primary transition-colors">Events</Link></li>
                        <li><Link href="/app/opportunities" className="hover:text-primary transition-colors">Opportunities</Link></li>
                        <li><Link href="/app/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/app/library" className="hover:text-primary transition-colors">Library</Link></li>
                        <li><Link href="/app/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    </ul>
                </nav>
                <div className="hidden md:block">
                    <Link href="/app/login">
                        <Button className="bg-blue-600 hover:bg-black text-white transition-colors">Login/Signup</Button>
                    </Link>
                </div>
                <button className="md:hidden text-white" onClick={toggleMobileMenu}>
                    <Menu size={24} />
                </button>
            </div>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    )
}