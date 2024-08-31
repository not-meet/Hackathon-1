'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Users, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<'mentor' | 'mentee'>('mentor')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleTabChange = (value: 'mentor' | 'mentee') => {
        setActiveTab(value)
    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            // Use absolute URL if your API is on a different domain
            const response = await axios.post('/api/auth/login', {
                email,
                password,
                role: activeTab
            })

            // Handle successful login here
            console.log('Login successful:', response.data)
            // You can redirect the user or show a success message here
        } catch (error) {
            // Handle errors here
            console.error('Login failed:', error)
            // Show an error message to the user here
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F3F4] flex flex-col md:flex-row">
            {/* Left side with logo and info */}
            <div className="w-full md:w-1/3 bg-white flex flex-col items-center justify-center p-8 text-black">
                <Link href="/" className="text-4xl font-bold mb-8">
                    <span className="text-blue-600">Mentor</span>Connect
                </Link>
                <div className="space-y-6 text-center">
                    <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Users size={48} className="mx-auto mb-2" />
                        <h3 className="text-xl font-semibold">Connect</h3>
                        <p className="text-sm text-black">Find your perfect mentor or mentee match</p>
                    </div>
                    <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Briefcase size={48} className="mx-auto mb-2" />
                        <h3 className="text-xl font-semibold">Grow</h3>
                        <p className="text-sm text-black">Accelerate your career with expert guidance</p>
                    </div>
                    <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <GraduationCap size={48} className="mx-auto mb-2" />
                        <h3 className="text-xl font-semibold">Learn</h3>
                        <p className="text-sm text-black">Gain valuable insights and skills</p>
                    </div>
                </div>
            </div>

            {/* Right side with login forms */}
            <div className="w-full md:w-2/3 p-8 flex items-center justify-center bg-gradient-to-br from-[#F5F3F4] to-[#D3D3D3]">
                <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-[#0B090A]">Log In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={handleTabChange as (value: string) => void} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger
                                    value="mentor"
                                    className={`text-lg font-semibold py-3 rounded-full transition-all duration-300 mr-1 ${activeTab === 'mentor'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-[#D3D3D3] text-[#0B090A]'
                                        } hover:bg-blue-600 hover:text-white hover:shadow-md`}
                                >
                                    I'm a Mentee
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mentee"
                                    className={`text-lg font-semibold py-3 rounded-full transition-all duration-300 ${activeTab === 'mentee'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-[#D3D3D3] text-[#0B090A]'
                                        } hover:bg-blue-600 hover:text-white hover:shadow-md`}
                                >
                                    I'm a Mentor
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="mentor">
                                <form className="space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white border-[#B1A7A6] focus:border-blue-600 transition-colors duration-300 rounded-full py-6"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-white border-[#B1A7A6] focus:border-blue-600 transition-colors duration-300 rounded-full py-6"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-600 text-white transition-colors duration-300 flex items-center justify-center rounded-full py-6">
                                        Log In as Mentor <ArrowRight className="ml-2" size={18} />
                                    </Button>
                                </form>
                                <p className="mt-6 text-center text-sm text-blue-600">
                                    Don't have an account?{" "}
                                    <Link href="signup" className="font-medium text-blue-600 hover:underline transition-colors duration-300">
                                        Sign up
                                    </Link>
                                </p>
                            </TabsContent>
                            <TabsContent value="mentee">
                                <form className="space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white border-[#B1A7A6] focus:border-blue-600 transition-colors duration-300 rounded-full py-6"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-white border-[#B1A7A6] focus:border-blue-600 transition-colors duration-300 rounded-full py-6"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-600 text-white transition-colors duration-300 flex items-center justify-center rounded-full py-6">
                                        Log In as Mentee <ArrowRight className="ml-2" size={18} />
                                    </Button>
                                </form>
                                <p className="mt-6 text-center text-sm text-blue-600">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="font-medium text-blue-600 hover:underline transition-colors duration-300">
                                        Sign up
                                    </Link>
                                </p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
