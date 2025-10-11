import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronLeft, Heart } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-600" />
              <span className="text-xl font-bold text-green-700">Attentive Home Care, Inc.</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-700 mb-6">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-700" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointment Request Received</h1>

          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <p className="text-gray-600 mb-6">
              Thank you for scheduling a consultation with Attentive Home Care. We have received your appointment
              request and a member of our care team will contact you within 24 hours to confirm your appointment.
            </p>

            <div className="text-left bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-medium text-gray-900 mb-4">What happens next?</h3>
              <ol className="space-y-3 list-decimal list-inside text-gray-600">
                <li>Our care coordinator will review your request</li>
                <li>We'll call you to confirm your appointment time</li>
                <li>We'll answer any immediate questions you may have</li>
                <li>We'll prepare for your consultation based on your needs</li>
              </ol>
            </div>

            <p className="text-sm text-gray-500">
              If you need immediate assistance or would like to speak with someone sooner, please call us at{" "}
              <span className="font-medium text-green-700">571-449-6448</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button asChild className="bg-green-700 hover:bg-green-800">
              <Link href="/services">Learn About Our Services</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-5 w-5 text-rose-600" />
              <span className="text-sm font-medium">Attentive Home Care, Inc.</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Attentive Home Care, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
