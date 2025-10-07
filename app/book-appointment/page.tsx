"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, Heart, Info, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  appointmentType: z.string({
    required_error: "Please select an appointment type.",
  }),
  appointmentDate: z.date({
    required_error: "Please select a date for your appointment.",
  }),
  appointmentTime: z.string({
    required_error: "Please select a time for your appointment.",
  }),
  appointmentFor: z.enum(["self", "other"], {
    required_error: "Please select who this appointment is for.",
  }),
  careNeeds: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
})

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const careOptions = [
  { id: "companionship", label: "Companionship" },
  { id: "personal-care", label: "Personal Care" },
  { id: "homemaking", label: "Homemaking" },
  { id: "respite-care", label: "Respite Care" },
  { id: "medication-reminders", label: "Medication Reminders" },
  { id: "transportation", label: "Transportation" },
]

export default function BookAppointmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      appointmentType: "",
      appointmentFor: "self",
      careNeeds: [],
      additionalInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      router.push("/book-appointment/confirmation")
    }, 1500)
  }

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["firstName", "lastName", "email", "phone", "appointmentFor"])
      const isValid =
        !form.formState.errors.firstName &&
        !form.formState.errors.lastName &&
        !form.formState.errors.email &&
        !form.formState.errors.phone &&
        !form.formState.errors.appointmentFor

      if (isValid) {
        setStep(2)
        window.scrollTo(0, 0)
      }
    }
  }

  const prevStep = () => {
    setStep(1)
    window.scrollTo(0, 0)
  }

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

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-700 mb-6">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
              <p className="text-gray-600">
                Schedule a consultation with our care team to discuss your needs and how we can help.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {step === 1 ? "Personal Information" : "Appointment Details"}
                  </h2>
                  <div className="text-sm text-gray-500">Step {step} of 2</div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-green-700 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="appointmentFor"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Who is this appointment for?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="self" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Myself</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Someone else (family member, friend, etc.)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="w-full md:w-auto bg-green-700 hover:bg-green-800"
                        >
                          Continue to Appointment Details
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="appointmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Appointment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="initial-consultation">Initial Consultation</SelectItem>
                                <SelectItem value="care-assessment">Care Assessment</SelectItem>
                                <SelectItem value="service-inquiry">Service Inquiry</SelectItem>
                                <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="appointmentDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Appointment Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                      date.getDay() === 0 ||
                                      date.getDay() === 6
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>Monday to Friday only. Weekends unavailable.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="appointmentTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Time</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="careNeeds"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Care Services Needed (Optional)</FormLabel>
                              <FormDescription>Select all that apply</FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {careOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="careNeeds"
                                  render={({ field }) => {
                                    return (
                                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(field.value?.filter((value) => value !== item.id))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please share any additional details that would help us prepare for your appointment..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Book Appointment"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-8">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IHQFJ2UjgsosGIF5ytA9X4MjtkNe8W.png"
                  alt="Caregiver helping elderly client"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Book a Consultation?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Info className="h-3 w-3 text-green-700" />
                    </div>
                    <span className="text-gray-600 text-sm">Discuss your specific care needs with our experts</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Info className="h-3 w-3 text-green-700" />
                    </div>
                    <span className="text-gray-600 text-sm">Learn about our personalized care plans</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Info className="h-3 w-3 text-green-700" />
                    </div>
                    <span className="text-gray-600 text-sm">Get answers to your questions about home care</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Info className="h-3 w-3 text-green-700" />
                    </div>
                    <span className="text-gray-600 text-sm">No obligation - just information to help you decide</span>
                  </li>
                </ul>

                <div className="border-t mt-6 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Need immediate assistance?</h4>
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <Phone className="h-4 w-4" />
                    <span>571-449-6448</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-5pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t py-8">
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
