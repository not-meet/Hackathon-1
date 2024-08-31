"use client";
import { useState } from "react";
import * as React from "react";
import Link from "next/link";
import axios from "axios";

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`px-4 py-2 bg-[#284B63] hover:bg-[#3C6E71] text-white rounded-md ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full p-2 border border-[#D9D9D9] rounded-md focus:border-[#3C6E71] focus:outline-none ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Textarea component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`w-full p-2 border border-[#D9D9D9] rounded-md focus:border-[#3C6E71] focus:outline-none min-h-[100px] ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Label component
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={`block text-sm font-medium text-[#353535] ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

// Card components
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white border-2 border-[#3C6E71] rounded-lg shadow-lg ${className}`} {...props} />
);

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 bg-[#284B63] text-white rounded-t-lg ${className}`} {...props} />
);

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-3xl font-bold ${className}`} {...props} />
);

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-[#D9D9D9] mt-2 ${className}`} {...props} />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
);

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 border-t border-[#D9D9D9] ${className}`} {...props} />
);

// Tabs components
const Tabs = ({ value, onValueChange, className, children }: { value: string; onValueChange: (value: string) => void; className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

const TabsList = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex ${className}`}>{children}</div>
);

const TabsTrigger = ({ value, activeValue, onClick, className, children }: { value: string; activeValue: string; onClick: () => void; className?: string; children: React.ReactNode }) => (
  <button
    className={`flex-1 py-2 text-center ${value === activeValue ? 'bg-[#3C6E71] text-white' : 'bg-[#D9D9D9] text-[#353535]'} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ value, activeValue, children }: { value: string; activeValue: string; children: React.ReactNode }) => (
  value === activeValue ? <div>{children}</div> : null
);

const UsersIcon = () => (
  <svg
    className="w-12 h-12 mx-auto mb-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    className="w-12 h-12 mx-auto mb-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const GraduationCapIcon = () => (
  <svg
    className="w-12 h-12 mx-auto mb-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
    />
  </svg>
);

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState('mentee');
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', formData);
      console.log('Response:', response.data);
      // Handle successful submission (e.g., redirect, display a message, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const renderInput = (id: string, label: string, type = "text", placeholder = "") => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        onChange={handleChange}
      />
    </div>
  );

  const renderTextarea = (id: string, label: string, placeholder: string) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#D9D9D9] text-[#353535]">
      {/* Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 bottom-0 w-[33.33%] bg-[#161A1D] flex-col items-center justify-center p-5 text-white">
        <Link href="/" className="text-4xl font-bold mb-8">
          <span className="text-[#E5383B]">Mentor</span>Connect
        </Link>
        {/* Icons and descriptions */}
        <div className="space-y-3 text-center">
          <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <UsersIcon />
            <h3 className="text-xl font-semibold">Connect</h3>
            <p className="text-sm text-[#B1A7A6]">Find your perfect mentor or mentee match</p>
          </div>
          <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <BriefcaseIcon />
            <h3 className="text-xl font-semibold">Grow</h3>
            <p className="text-sm text-[#B1A7A6]">Accelerate your career with expert guidance</p>
          </div>
          <div className="hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <GraduationCapIcon />
            <h3 className="text-xl font-semibold">Learn</h3>
            <p className="text-sm text-[#B1A7A6]">Gain valuable insights and skills</p>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-[33.33%] bg-[#D9D9D9] text-[#353535] p-4 overflow-y-auto">
        <h1 className="text-5xl font-bold text-[#284B63] mb-8"></h1>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Join our community as a mentor or mentee
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#D9D9D9]">
                <TabsTrigger
                  value="mentee"
                  activeValue={activeTab}
                  onClick={() => setActiveTab('mentee')}
                  className="rounded-tl-md rounded-bl-md"
                >
                  I'm a Mentee
                </TabsTrigger>
                <TabsTrigger
                  value="mentor"
                  activeValue={activeTab}
                  onClick={() => setActiveTab('mentor')}
                  className="rounded-tr-md rounded-br-md"
                >
                  I'm a Mentor
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mentee" activeValue={activeTab}>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {renderInput("mentee-name", "Name", "text", "John Doe")}
                    {renderInput("mentee-email", "Email", "email", "john@example.com")}
                  </div>
                  {renderInput("mentee-password", "Password", "password")}
                  {renderTextarea("mentee-bio", "Bio", "Tell us about yourself and what you hope to learn")}
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="mentor" activeValue={activeTab}>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {renderInput("mentor-name", "Name", "text", "Jane Smith")}
                    {renderInput("mentor-email", "Email", "email", "jane@example.com")}
                  </div>
                  {renderInput("mentor-password", "Password", "password")}
                  {renderTextarea("mentor-bio", "Bio", "Tell us about your experience and expertise")}
                  {renderTextarea("mentor-expertise", "Expertise", "List your areas of expertise, separated by commas")}
                  {renderInput("mentor-degree", "Degree", "text", "e.g. Bachelor's in Computer Science")}
                  {renderInput("mentor-specialization", "Specialization", "text", "e.g. Machine Learning")}
                  {renderTextarea("mentor-places-worked", "Places Worked", "List the companies or institutions you've worked for")}
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-[#353535] text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#3C6E71] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#3C6E71] hover:underline">
                Privacy Policy
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}