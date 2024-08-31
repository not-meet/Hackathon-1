"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const opportunities = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp',
    type: 'Internship',
    location: 'Remote',
    description: 'Exciting opportunity for a passionate frontend developer to work on cutting-edge projects.',
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'DataMinds Inc.',
    type: 'Full-time',
    location: 'New York, NY',
    description: 'Join our team of data experts and work on challenging machine learning projects.',
  },
  {
    id: 3,
    title: 'UX Research Program',
    company: 'DesignHub',
    type: 'Workshop',
    location: 'Online',
    description: '6-week intensive program to learn and apply UX research methodologies.',
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'CloudSolutions',
    type: 'Full-time',
    location: 'San Francisco, CA',
    description: 'Build scalable backend systems for our cloud-based products.',
  },
  {
    id: 5,
    title: 'Marketing Intern',
    company: 'GrowthGenius',
    type: 'Internship',
    location: 'Chicago, IL',
    description: 'Learn and apply digital marketing strategies in a fast-paced startup environment.',
  },
  {
    id: 6,
    title: 'AI Ethics Seminar',
    company: 'FutureAI Foundation',
    type: 'Event',
    location: 'Virtual',
    description: 'Join industry experts in discussing the ethical implications of AI development.',
  },
];

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'All' || opp.type === filterType)
  );

  return (
    <div className="min-h-screen bg-[#E1E5F2] ">
        <Header />

      <main className="container mx-auto mt-5">
        <h1 className="mb-8 text-4xl font-bold text-black">Opportunities</h1>

        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select onValueChange={setFilterType} defaultValue="All">
            <SelectTrigger className="w-full md:w-[180px] bg-white">
              <SelectValue placeholder="Filter by type " />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredOpportunities.map((opp) => (
            <Card key={opp.id} className="bg-white flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-[#022B3A]">{opp.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-[#1F7A8C] mb-2">{opp.company}</p>
                <p className="text-gray-700 mb-4">{opp.description}</p>
                <div className="flex flex-wrap space-x-2">
                  <Badge variant="secondary" className="bg-[#B6D5F7] text-[#022B3A]">
                    {opp.type === 'Internship' && <GraduationCap className="mr-1 h-3 w-3" />}
                    {opp.type === 'Full-time' && <Briefcase className="mr-1 h-3 w-3" />}
                    {(opp.type === 'Workshop' || opp.type === 'Event') && <Globe className="mr-1 h-3 w-3" />}
                    {opp.type}
                  </Badge>
                  <Badge variant="outline" className="text-[#1F7A8C]">{opp.location}</Badge>
                </div>
              </CardContent>
              <div className="pt-4">
                <Button className="w-full bg-blue-600 text-white hover:bg-[#1F7A8C]/90">
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}
