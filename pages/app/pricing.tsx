"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CheckIcon, Star, Zap, Target } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MembershipPlans() {
    const [isAnnual, setIsAnnual] = useState(false)

    const plans = [
        {
            name: "Explorer",
            icon: <Star className="h-8 w-8 mb-2" />,
            price: 0,
            description: "For curious minds",
            features: [
                "Free e-mail alerts",
                "3-minute mentor matches",
                "10 mentors",
                "5 learning paths"
            ],
            buttonText: "Start exploring"
        },
        {
            name: "Achiever",
            icon: <Zap className="h-8 w-8 mb-2" />,
            price: isAnnual ? 1650 : 2000, // INR
            description: "For dedicated learners",
            features: [
                "Unlimited mentor calls",
                "30-second mentor matches",
                "50 mentors",
                "5 learning paths",
                "Single-user account"
            ],
            buttonText: "Boost your growth"
        },
        {
            name: "Mastermind",
            icon: <Target className="h-8 w-8 mb-2" />,
            price: isAnnual ? 5500 : 6500, // INR
            description: "For career accelerators",
            features: [
                "Everything in Achiever",
                "Up to 5 team members",
                "100 mentors",
                "15 learning paths",
                "On-call scheduling",
                "200+ skill integrations"
            ],
            buttonText: "Accelerate your career",
            highlighted: true
        }
    ]

    return (
        <div className="min-h-screen bg-[#E1E5F2]">
            <Header />
            <h1 className="mb-2 text-center text-4xl font-bold text-[#022B3A] mt-5">Reassuringly Affordable</h1>
            <p className="mb-8 text-center text-xl text-[#1F7A8C]">All plans come with a 60-day money-back guarantee.</p>

            <div className="mb-8 flex items-center justify-center space-x-4">
                <span className={`text-lg ${!isAnnual ? 'text-[#022B3A] font-bold' : 'text-[#1F7A8C]'}`}>Monthly plans</span>
                <Button
                    variant="outline"
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="bg-white text-[#022B3A] hover:bg-[#B6D5F7]"
                >
                    {isAnnual ? 'Switch to Monthly' : 'Switch to Annual'}
                </Button>
                <span className={`text-lg ${isAnnual ? 'text-[#022B3A] font-bold' : 'text-[#1F7A8C]'}`}>Annual plans</span>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-10">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`rounded-lg ${plan.highlighted
                            ? 'bg-[#1F7A8C] text-white'
                            : 'bg-white text-[#022B3A]'
                            } p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
                    >
                        <div className="flex flex-col items-center mb-4">
                            {plan.icon}
                            <h2 className="text-2xl font-bold">{plan.name}</h2>
                        </div>
                        <p className="mb-4 text-sm opacity-80 text-center">{plan.description}</p>
                        <p className="mb-4 text-4xl font-bold text-center">
                            ₹{plan.price}
                            <span className="text-base font-normal">{plan.price > 0 ? '/mo' : ''}</span>
                        </p>
                        <Button
                            className={`mb-6 w-full ${plan.highlighted
                                ? 'bg-white text-[#1F7A8C] hover:bg-[#B6D5F7]'
                                : 'bg-[#1F7A8C] text-white hover:bg-[#1F7A8C]/90'
                                } transition-colors duration-300 ease-in-out`}
                        >
                            {plan.buttonText}
                        </Button>
                        <ul className="space-y-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                    <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}
