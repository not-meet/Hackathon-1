'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Book, Clock, Users, Star, Briefcase } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const courses = [
    { id: 1, title: "Introduction to Machine Learning", category: "Data Science", duration: "6 weeks", lessons: 30, students: 5000, rating: 4.7, level: "Beginner", instructor: "Dr. Alice Johnson", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 2, title: "Web Development Fundamentals", category: "Web Development", duration: "4 weeks", lessons: 24, students: 7500, rating: 4.8, level: "Beginner", instructor: "Bob Smith", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 3, title: "Cybersecurity Basics", category: "Security", duration: "5 weeks", lessons: 25, students: 3000, rating: 4.6, level: "Beginner", instructor: "Carol Williams", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 4, title: "Introduction to Data Visualization", category: "Data Science", duration: "3 weeks", lessons: 15, students: 4500, rating: 4.5, level: "Beginner", instructor: "David Brown", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 5, title: "Cloud Computing Essentials", category: "Cloud Computing", duration: "4 weeks", lessons: 20, students: 2500, rating: 4.7, level: "Beginner", instructor: "Eva Davis", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 6, title: "UI/UX Design Principles", category: "Design", duration: "3 weeks", lessons: 18, students: 6000, rating: 4.9, level: "Beginner", instructor: "Frank Miller", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 7, title: "Blockchain Fundamentals", category: "Blockchain", duration: "5 weeks", lessons: 25, students: 2000, rating: 4.6, level: "Beginner", instructor: "George Wilson", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 8, title: "Python for Beginners", category: "Programming", duration: "6 weeks", lessons: 30, students: 8000, rating: 4.8, level: "Beginner", instructor: "Hannah Brown", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
    { id: 9, title: "Mobile App Design Basics", category: "Mobile Development", duration: "4 weeks", lessons: 20, students: 3500, rating: 4.7, level: "Beginner", instructor: "Ian Taylor", thumbnail: "https://img.freepik.com/free-vector/flat-design-people-business-training-illustrated_23-2148913909.jpg?size=626&ext=jpg" },
]

export default function FreeCoursesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedLevel, setSelectedLevel] = useState("All")

    const filteredCourses = courses.filter(course =>
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "All" || course.category === selectedCategory) &&
        (selectedLevel === "All" || course.level.includes(selectedLevel))
    )

    const categories = ["All", ...Array.from(new Set(courses.map(course => course.category)))]
    const levels = ["All", "Beginner", "Intermediate", "Advanced"]

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-base-200 to-base-300 text-base-content">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
                    Explore Our <span className="text-secondary">Free Courses</span>
                </h1>

                <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
                    <div className="w-full md:w-2/3 relative">
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-600 focus:outline-none focus:border-secondary transition-colors duration-300"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={24} />
                    </div>
                    <div className="flex space-x-4 w-full md:w-1/3">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-1/2 bg-white border-2 border-gray-600" >
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {categories.map(category => (
                                    <SelectItem key={category} value={category} className="hover:bg-gray-100">{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                            <SelectTrigger className="w-full sm:w-1/2 bg-white border-2 border-gray-600">
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {levels.map(level => (
                                    <SelectItem key={level} value={level} className="hover:bg-gray-100">{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4">
                            <figure>
                                <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover rounded-t-lg" />
                            </figure>
                            <div className="card-body flex flex-col justify-between p-4">
                                <div>
                                    <h2 className="card-title text-lg sm:text-xl mb-2">
                                        {course.title}
                                    </h2>
                                    <div className="badge badge-secondary mb-2">{course.category}</div>
                                    <div className="space-y-2 mt-2 text-sm">
                                        <p className="flex items-center">
                                            <Clock size={14} className="mr-2" />
                                            Duration: {course.duration}
                                        </p>
                                        <p className="flex items-center">
                                            <Book size={14} className="mr-2" />
                                            {course.lessons} lessons
                                        </p>
                                        <p className="flex items-center">
                                            <Users size={14} className="mr-2" />
                                            {course.students} students enrolled
                                        </p>
                                        <p className="flex items-center">
                                            <Star size={14} className="mr-2" />
                                            {course.rating} ({course.level})
                                        </p>
                                        <p className="flex items-center">
                                            <Briefcase size={14} className="mr-2" />
                                            Instructor: {course.instructor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold text-green-600">Free</span>
                                    <Link href={`/courses/${course.id}`} className="btn btn-primary bg-blue-600 text-white hover:bg-black rounded-lg px-4 py-2 transition-colors text-sm">
                                        Start Learning
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}