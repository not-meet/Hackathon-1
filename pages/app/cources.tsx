'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Book, Clock, Users, Star, Briefcase } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const categories = ["All", "Data Science", "Web Development", "Security", "Cloud Computing", "Design", "Blockchain", "Mobile Development"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

interface Video {
    title: string;
    description?: string;
    url: string;
}

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    isPaid: boolean;
    videos: Video[];
    pdfs: string[];
    mentorId: string; // Adjust according to your ObjectId type
    createdAt?: Date;
    updatedAt?: Date;
    category: string;
    duration: string;
    lessons: number;
    students: number;
    rating: number;
    level: string;
    instructor: string;
    thumbnail: string;
}

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedLevel, setSelectedLevel] = useState("All")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCourse, setNewCourse] = useState<Course>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        isPaid: false,
        videos: [],
        pdfs: [],
        mentorId: '',
        category: '',
        duration: '',
        lessons: 0,
        students: 0,
        rating: 0,
        level: '',
        instructor: '',
        thumbnail: '',
    })

    useEffect(() => {
        // Fetch courses from the backend
        axios.get('/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error))
    }, [])

    const filteredCourses = courses.filter(course =>
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "All" || course.category === selectedCategory) &&
        (selectedLevel === "All" || course.level.includes(selectedLevel))
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewCourse(prevCourse => ({ ...prevCourse, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setNewCourse(prevCourse => ({ ...prevCourse, [name]: value }))
    }

    const handlePublishCourse = () => {
        axios.post('/api/courses', newCourse)
            .then(response => {
                setCourses([...courses, response.data])
                setIsModalOpen(false)
            })
            .catch(error => console.error('Error publishing course:', error))
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-base-200 to-base-300 text-base-content">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
                    Explore Our <span className="text-secondary">Expert-Led Courses</span>
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
                            <SelectTrigger className="w-full sm:w-1/4 bg-white border-2 border-gray-600" >
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {categories.map(category => (
                                    <SelectItem key={category} value={category} className="hover:bg-gray-100">{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                            <SelectTrigger className="w-full sm:w-1/4 bg-white border-2 border-gray-600">
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {levels.map(level => (
                                    <SelectItem key={level} value={level} className="hover:bg-gray-100">{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary bg-blue-600 text-white hover:bg-black rounded-lg px-4 py-2 transition-colors text-sm"
                        >
                            Add Course
                        </button>
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
                                        <p className="flex items-center">
                                            <Briefcase size={14} className="mr-2" />
                                            Description: {course.description}
                                        </p>
                                        <p className="flex items-center">
                                            <Briefcase size={14} className="mr-2" />
                                            Price: ₹{course.price}
                                        </p>
                                        <p className="flex items-center">
                                            <Briefcase size={14} className="mr-2" />
                                            Is Paid: {course.isPaid ? "Yes" : "No"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold">₹{course.price}</span>
                                    <Link href={`/courses/${course.id}`} className="btn btn-primary bg-blue-600 text-white hover:bg-black rounded-lg px-4 py-2 transition-colors text-sm">
                                        Enroll Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
                        <form>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Course Title"
                                    value={newCourse.title}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full  border border-blue-600 rounded p-1/5"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Course Description"
                                    value={newCourse.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full border border-blue-600 rounded p-1/5"
                                />
                                <label htmlFor="No of lectures">No of lectures: </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={newCourse.price}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full border border-blue-600 rounded p-1/5"
                                />
                                <Select value={newCourse.category} onValueChange={(value) => handleSelectChange('category', value)}>
                                    <SelectTrigger className="w-full bg-white border  border-blue-600 rounded p-1/5">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {categories.map(category => (
                                            <SelectItem key={category} value={category} className="hover:bg-gray-100">{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={newCourse.level} onValueChange={(value) => handleSelectChange('level', value)}>
                                    <SelectTrigger className="w-full bg-white border border-blue-600 rounded p-1/5">
                                        <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {levels.map(level => (
                                            <SelectItem key={level} value={level} className="hover:bg-gray-100">{level}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={newCourse.duration}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full border border-blue-600 rounded p-1/5"
                                />
                                <input
                                    type="text"
                                    name="instructor"
                                    placeholder="Instructor"
                                    value={newCourse.instructor}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full border border-blue-600 rounded p-1/5"
                                />
                                <input
                                    type="text"
                                    name="thumbnail"
                                    placeholder="Thumbnail URL"
                                    value={newCourse.thumbnail}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full border border-blue-600 rounded p-1/5"
                                />
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="isPaid"
                                        checked={newCourse.isPaid}
                                        onChange={() => setNewCourse({ ...newCourse, isPaid: !newCourse.isPaid })}
                                        className="checkbox checkbox-primary border border-blue-600 rounded p-1/5"
                                    />
                                    <span>Is Paid?</span>
                                </label>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePublishCourse}
                                    className="btn btn-primary bg-blue-600 text-white hover:bg-black p-2 rounded"
                                >
                                    Publish Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}