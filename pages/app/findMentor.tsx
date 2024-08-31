"use client"
import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, Search, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const mentors = [
  { name: "Kevin Indig", role: "Director of SEO at Shopify", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Kevin is a seasoned SEO expert with years of experience in optimizing search engine performance and strategy." },
  { name: "Ray Forer", role: "Co-Founder at Quartz VC", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Ray is a venture capitalist with a focus on investing in innovative startups and emerging technologies." },
  { name: "Hannah Parvaz", role: "Head of Growth at Curio", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Hannah excels in scaling businesses through growth strategies and data-driven marketing approaches." },
  { name: "Eden Bidani", role: "Conversion Copywriter", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Eden specializes in crafting compelling copy that drives conversions and engages audiences." },
  { name: "Nurkan Kirkan", role: "Head of Growth at Trustpilot", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Nurkan leads growth initiatives with a focus on expanding Trustpilot’s market presence and customer engagement." },
  { name: "Michael Taylor", role: "Co-Founder at Ladder.io", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Michael is an entrepreneur with a track record of building and scaling successful startups." },
  { name: "Joanna Delaney", role: "Senior Marketing Strategist at Videous", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Joanna provides strategic marketing insights and campaigns to drive brand growth and customer acquisition." },
  { name: "Margarita Loktionova", role: "Content Marketing Lead at Semrush", image: "https://img.freepik.com/premium-vector/auctioneer-vector-character-flat-style_1033579-66356.jpg?ga=GA1.1.1867255598.1725018948&semt=ais_hybrid", description: "Margarita leads content marketing efforts, creating impactful content strategies that enhance brand visibility." },
]

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-[#F5F3F4] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#0B090A] mb-8 text-center">Discover Your Perfect Mentor</h1>

        {/* Search */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <Input
              className="bg-white text-[#0B090A] pl-10 pr-4 py-2 w-full rounded-full border-2 border-[#B1A7A6] focus:outline-none focus:border-[#E5383B]"
              placeholder="Search for mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B1A7A6]" size={20} />
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.map((mentor, index) => (
            <Card key={index} className="bg-white border-[#B1A7A6] border overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mb-4 border-2 border-gray-600"
                />
                <h2 className="text-lg font-semibold text-[#0B090A] mb-1">{mentor.name}</h2>
                <p className="text-[#161A1D] text-sm mb-2">{mentor.role}</p>
                <p className="text-[#6C6E6F] text-sm mb-2">{mentor.description}</p> {/* Added description */}
                <Button className="mt-4 bg-blue-600 hover:bg-black text-white transition-colors">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}