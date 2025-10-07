import Image from "next/image"
import Link from "next/link"
import { Check, Heart, Home, Phone, Mail, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-600" />
            <span className="text-xl font-bold text-green-700">Attentive Home Care, Inc.</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#home" className="text-sm font-medium hover:text-green-700">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-green-700">
              About Us
            </Link>
            <Link href="#services" className="text-sm font-medium hover:text-green-700">
              Services
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-green-700">
              Contact
            </Link>
            <Link href="/book_appointment" className="text-sm font-medium hover:text-green-700">
              Book a Time
            </Link>
          </nav>
          <div className="hidden md:flex">
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Phone className="mr-2 h-4 w-4" /> Call Us Today
            </Button>
          </div>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section id="home" className="relative bg-gradient-to-r from-green-50 to-rose-50 py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-green-800">
                Compassionate Home Care for Your Loved Ones
              </h1>
              <p className="text-lg text-gray-600">
                Providing high-quality non-medical home care services that improve the quality of life for every client.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-700 hover:bg-green-800 text-white">Our Services</Button>
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50 bg-transparent">
                  <Phone className="mr-2 h-4 w-4" /> 571-449-6448
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="https://media.istockphoto.com/id/1719538017/photo/home-care-healthcare-professional-hugging-senior-patient.jpg?s=612x612&w=0&k=20&c=DTQwVD1DTH0CMQ78aox8-cVKg8Nl-wCkSwY-S072M4E="
                alt="Caregiver helping senior at home"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 font-medium">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold text-green-800">Improving Quality of Life</h2>
                <p className="text-gray-600">
                  It is our mission to deliver high standard, budget-friendly, and personalized non-medical homecare
                  services that will improve the quality of life of every client that we encounter. We endeavor to help
                  our clients live a healthier, safer, and more independent life at home.
                </p>
                <div className="pt-4">
                  <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-800 font-medium">
                    Our Vision
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-rose-700">Exceeding Expectations</h2>
                  <p className="mt-4 text-gray-600">
                    We endeavor to use the latest techniques and advances in non-medical home care so that we can exceed
                    our client's expectations and become one of Virginia's top non-medical home care providers.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="data:image/jpeg;base64,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"
                  alt="Caring for seniors"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-800 font-medium">
                Our Services
              </div>
              <h2 className="mt-2 text-3xl font-bold text-rose-700">Personalized Care Services</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                If you are looking for high-quality non-medical home care services, you can rely on Attentive Home Care,
                Inc. to provide what you need. Our caregivers will thoroughly evaluate your situation, and attentively
                listen to your requests.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Companionship</h3>
                <p className="mt-2 text-gray-600">
                  Friendly conversation, emotional support, and social engagement for your loved ones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Homemaking</h3>
                <p className="mt-2 text-gray-600">
                  Light housekeeping, meal preparation, and other household tasks to maintain a comfortable living
                  environment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Personal Care</h3>
                <p className="mt-2 text-gray-600">
                  Assistance with activities of daily living such as bathing, dressing, and personal hygiene.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Respite Care</h3>
                <p className="mt-2 text-gray-600">
                  Temporary relief for family caregivers to rest and recharge while ensuring your loved one receives
                  quality care.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-rose-600 hover:bg-rose-700">Learn More About Our Services</Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Caregiver with client"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-green-800">Why Choose Attentive Home Care?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Personalized Care Plans</h3>
                      <p className="text-gray-600">
                        Customized care plans tailored to your specific needs and preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Experienced Caregivers</h3>
                      <p className="text-gray-600">
                        Our caregivers are thoroughly screened, trained, and compassionate professionals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Budget-Friendly Options</h3>
                      <p className="text-gray-600">
                        Affordable care solutions without compromising on quality or service.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Available When You Need Us</h3>
                      <p className="text-gray-600">
                        Flexible scheduling to accommodate your needs, including evenings and weekends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 font-medium">
                Contact Us
              </div>
              <h2 className="mt-2 text-3xl font-bold text-green-800">Get In Touch</h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                We encourage you to call us or set an appointment if you have further questions or need clarifications
                regarding our services at Attentive Home Care, Inc.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Phone</h3>
                <p className="mt-2 text-gray-600">571-449-6448</p>
                <p className="text-gray-600">Fax: 571-449-3304</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Email</h3>
                <p className="mt-2 text-gray-600">attentivehomecare55@gmail.com</p>
                <p className="text-gray-600">www.attentivehomecareva.com</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Location</h3>
                <p className="mt-2 text-gray-600">Serving the Northern Virginia area</p>
                <p className="text-gray-600">Call for a free consultation</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-green-700 hover:bg-green-800">Schedule a Consultation</Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-rose-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Contact us today to learn more about our services and how we can help improve the quality of life for you
              or your loved one.
            </p>
            <div className="mt-8">
              <Button className="bg-white text-rose-600 hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" /> Call 571-449-6448
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold">Attentive Home Care, Inc.</span>
              </div>
              <p className="text-gray-400">
                Providing high-quality non-medical home care services to improve the quality of life for our clients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-rose-500" /> 571-449-6448
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-500" /> attentivehomecare55@gmail.com
                </li>
                <li>
                  <Link href="http://www.attentivehomecareva.com" className="text-gray-400 hover:text-white">
                    www.attentivehomecareva.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Attentive Home Care, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
