"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const testimonials = [
  {
    id: 1,
    name: "Adam G.",
    role: "Consultant, Health Care Industry",
    image: "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?semt=ais_hybrid",
    quote: "The Mentoring Program Manager Course validated the mentoring journey that my Fortune 100 company is on. It also provided me with great insights and tools. Most importantly, it validated my skill set as a program manager.",
  },
  {
    id: 2,
    name: "Sarah L.",
    role: "HR Director, Tech Startup",
    image: "https://img.freepik.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid",
    quote: "I appreciated the way the course tracked my progress and I could log in and out on my own time. And to top it all off, I received a certificate at the completion of the course, validating my effort and accomplishment.",
  },
  {
    id: 3,
    name: "Michael R.",
    role: "Senior Manager, Manufacturing",
    image: "https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_158538-15796.jpg?semt=ais_hybrid",
    quote: "The insights gained from this course have revolutionized our mentoring program. It's not just about theory; the practical tools provided have made a tangible difference in our organization.",
  },
  {
    id: 4,
    name: "Emily T.",
    role: "Leadership Development Specialist",
    image: "https://img.freepik.com/premium-photo/indian-smiling-man-wearing-orange-sweater-with-his-arms-crossed-white-background_862994-604045.jpg?semt=ais_hybrid",
    quote: "As someone who's been in leadership development for years, I was skeptical about what new information I could gain. This course exceeded my expectations, offering fresh perspectives and innovative strategies.",
  },
  {
    id: 5,
    name: "David K.",
    role: "Entrepreneur & Business Coach",
    image: "https://img.freepik.com/premium-photo/woman-wearing-glasses-shirt-with-pair-glasses_1308157-174588.jpg?semt=ais_hybrid",
    quote: "The flexibility of this course allowed me to balance my busy schedule while still gaining invaluable knowledge. It's rare to find a program that caters so well to working professionals.",
  },
  {
    id: 6,
    name: "Lisa M.",
    role: "Non-Profit Executive Director",
    image: "https://img.freepik.com/free-photo/portrait-european-girl-with-tanned-skin-dark-hair_176420-28167.jpg?semt=ais_hybrid",
    quote: "In the non-profit sector, effective mentoring can make all the difference. This course provided me with the tools to implement a mentoring program that has significantly improved our volunteer retention and satisfaction.",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="min-h-screen bg-[#F5F3F4]">
        <Header />
      <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#0B090A] mb-8 text-center">Discover blogs by best mentors</h1>

        <div className="space-y-12">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-lg shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:ml-0 md:mr-12' : 'md:ml-12 md:mr-0'}`}>
              <div className="md:w-1/4 p-6 flex items-center justify-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-[#E5383B]"
                />
              </div>
              <div className="md:w-3/4 p-6 flex flex-col justify-center">
                <p className="text-[#161A1D] text-lg mb-4 italic">
                  {testimonial.quote}
                </p>
                <div>
                  <h3 className="text-[#A4161A] font-bold">{testimonial.name}</h3>
                  <p className="text-[#660708]">{testimonial.role}</p>
                </div>
                <Link href="#" className="text-[#E5383B] hover:text-[#BA181B] mt-4 flex items-center">
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}