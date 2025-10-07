"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, ChevronRight, Download, Heart, Info, Pen, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DocusignExamplePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [signatureAdded, setSignatureAdded] = useState(false)
  const [initialAdded, setInitialAdded] = useState(false)
  const [dateAdded, setDateAdded] = useState(false)
  const [showSignaturePanel, setShowSignaturePanel] = useState(false)
  const [signatureType, setSignatureType] = useState<"signature" | "initial">("signature")
  const [signatureStyle, setSignatureStyle] = useState("drawn")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [completed, setCompleted] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const openSignaturePanel = (type: "signature" | "initial") => {
    setSignatureType(type)
    setShowSignaturePanel(true)
  }

  const addSignature = () => {
    if (signatureType === "signature") {
      setSignatureAdded(true)
    } else {
      setInitialAdded(true)
    }
    setShowSignaturePanel(false)
    setDateAdded(true)
  }

  const cancelSignature = () => {
    setShowSignaturePanel(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-rose-600" />
                <span className="text-xl font-bold text-green-700">Attentive Home Care, Inc.</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-medium">Care Services Agreement</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {!completed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
        {!completed && (
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!completed ? (
          <div className="container mx-auto px-4 py-8">
            {/* Step 1: Review Document */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Review Document</h2>
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
                    <h3 className="font-medium">Care Services Agreement</h3>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-bold mb-2">ATTENTIVE HOME CARE, INC.</h2>
                      <h3 className="text-lg font-semibold mb-4">CARE SERVICES AGREEMENT</h3>
                      <p className="text-gray-500 text-sm">Document ID: AHC-2023-0458</p>
                    </div>

                    <div className="space-y-6 text-sm">
                      <p>
                        This Care Services Agreement (the "Agreement") is entered into as of the date of signing by and
                        between Attentive Home Care, Inc. ("Provider") and the undersigned client or client's authorized
                        representative ("Client").
                      </p>

                      <h4 className="font-semibold">1. SERVICES</h4>
                      <p>
                        Provider agrees to provide non-medical home care services to Client as outlined in the Care Plan
                        attached to this Agreement. Services may include companionship, homemaking, personal care, and
                        respite care as specified in the Care Plan.
                      </p>

                      <h4 className="font-semibold">2. TERM</h4>
                      <p>
                        This Agreement shall commence on the date of signing and shall continue until terminated by
                        either party as provided herein.
                      </p>

                      <h4 className="font-semibold">3. FEES AND PAYMENT</h4>
                      <p>
                        Client agrees to pay Provider for services at the rates specified in the attached Rate Schedule.
                        Payment is due upon receipt of invoice. Provider reserves the right to modify the Rate Schedule
                        with 30 days' written notice to Client.
                      </p>

                      <h4 className="font-semibold">4. CANCELLATION POLICY</h4>
                      <p>
                        Client may cancel scheduled services with at least 24 hours' notice without charge.
                        Cancellations with less than 24 hours' notice may result in a cancellation fee equal to 50% of
                        the scheduled service fee.
                      </p>

                      <div className="border-t pt-4 mt-8">
                        <p className="italic text-gray-600">
                          Please review the entire document carefully before proceeding to the next step.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="bg-green-700 hover:bg-green-800">
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Add Signature */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Sign Document</h2>
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 bg-gray-100 border-b">
                    <h3 className="font-medium">Care Services Agreement - Signature Page</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6 text-sm">
                      <h4 className="font-semibold">ACCEPTANCE OF TERMS</h4>
                      <p>
                        By signing below, Client acknowledges that they have read, understand, and agree to be bound by
                        the terms and conditions of this Agreement, including all attachments and incorporated
                        documents.
                      </p>

                      <div className="mt-8 space-y-6">
                        <div className="border rounded p-4 relative">
                          <div className="absolute -top-3 left-3 bg-white px-2 text-xs text-gray-500">
                            CLIENT SIGNATURE
                          </div>
                          {signatureAdded ? (
                            <div className="h-16 flex items-center">
                              <div className="italic text-blue-600 text-xl font-signature">Jane Smith</div>
                            </div>
                          ) : (
                            <div
                              className="h-16 border border-dashed border-yellow-500 bg-yellow-50 flex items-center justify-center cursor-pointer hover:bg-yellow-100"
                              onClick={() => openSignaturePanel("signature")}
                            >
                              <div className="flex items-center text-yellow-700">
                                <Pen className="h-4 w-4 mr-2" />
                                <span>Click here to sign</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded p-4 relative">
                            <div className="absolute -top-3 left-3 bg-white px-2 text-xs text-gray-500">DATE</div>
                            {dateAdded ? (
                              <div className="h-10 flex items-center">
                                <div className="text-blue-600">{new Date().toLocaleDateString()}</div>
                              </div>
                            ) : (
                              <div className="h-10 border border-dashed border-gray-300 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Auto-filled when signed</span>
                              </div>
                            )}
                          </div>

                          <div className="border rounded p-4 relative">
                            <div className="absolute -top-3 left-3 bg-white px-2 text-xs text-gray-500">INITIALS</div>
                            {initialAdded ? (
                              <div className="h-10 flex items-center">
                                <div className="italic text-blue-600 text-lg font-signature">JS</div>
                              </div>
                            ) : (
                              <div
                                className="h-10 border border-dashed border-yellow-500 bg-yellow-50 flex items-center justify-center cursor-pointer hover:bg-yellow-100"
                                onClick={() => openSignaturePanel("initial")}
                              >
                                <div className="flex items-center text-yellow-700">
                                  <Pen className="h-4 w-4 mr-2" />
                                  <span>Click to initial</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border rounded p-4 relative">
                          <div className="absolute -top-3 left-3 bg-white px-2 text-xs text-gray-500">PRINTED NAME</div>
                          <div className="h-10 flex items-center">
                            <div className="text-gray-700">Jane Smith</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-green-700 hover:bg-green-800"
                    disabled={!signatureAdded || !initialAdded}
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm and Complete */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Confirm and Complete</h2>
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-4 bg-gray-100 border-b">
                    <h3 className="font-medium">Review and Confirm</h3>
                  </div>
                  <div className="p-6">
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-800 font-medium">Almost done!</p>
                        <p className="text-blue-600 text-sm mt-1">
                          Please review your signature and information before completing this document.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h4 className="font-medium">Document Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Document Name</p>
                          <p className="font-medium">Care Services Agreement</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Document ID</p>
                          <p className="font-medium">AHC-2023-0458</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h4 className="font-medium">Signer Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Name</p>
                          <p className="font-medium">Jane Smith</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium">jsmith@example.com</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Signature Added</p>
                          <p className="font-medium text-green-600 flex items-center">
                            <Check className="h-4 w-4 mr-1" /> Yes
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Initials Added</p>
                          <p className="font-medium text-green-600 flex items-center">
                            <Check className="h-4 w-4 mr-1" /> Yes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-start space-x-2 mb-6">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the Electronic Records and Signature Disclosure
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            By checking this box, I consent to the electronic delivery of documents and to
                            electronically sign this document.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="bg-green-700 hover:bg-green-800" disabled={!agreedToTerms}>
                    Complete Signing
                    <Check className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Signature Panel */}
            {showSignaturePanel && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-medium">Add Your {signatureType === "signature" ? "Signature" : "Initials"}</h3>
                    <Button variant="ghost" size="sm" onClick={cancelSignature}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <Tabs defaultValue="draw" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="draw" onClick={() => setSignatureStyle("drawn")}>
                          Draw
                        </TabsTrigger>
                        <TabsTrigger value="type" onClick={() => setSignatureStyle("typed")}>
                          Type
                        </TabsTrigger>
                        <TabsTrigger value="upload" onClick={() => setSignatureStyle("uploaded")}>
                          Upload
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="draw" className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center bg-gray-50">
                          <p className="text-gray-400 text-center">
                            {signatureType === "signature" ? "Draw your signature here" : "Draw your initials here"}
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="type" className="space-y-4">
                        <div className="border rounded-lg p-4 h-32 flex items-center justify-center">
                          <p className="italic text-xl font-signature text-blue-600">
                            {signatureType === "signature" ? "Jane Smith" : "JS"}
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="upload" className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 p-4">
                          <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                            Choose File
                          </Button>
                          <p className="text-gray-400 text-center text-sm">
                            Upload an image of your {signatureType === "signature" ? "signature" : "initials"}
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-end space-x-3">
                      <Button variant="outline" onClick={cancelSignature}>
                        Cancel
                      </Button>
                      <Button onClick={addSignature} className="bg-green-700 hover:bg-green-800">
                        Adopt and Sign
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-700" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Signed Successfully!</h1>
              <p className="text-gray-600 mb-8">
                Your Care Services Agreement has been signed and completed. A copy has been emailed to you for your
                records.
              </p>

              <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Care Services Agreement</h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Document ID</h4>
                    <p className="font-medium">AHC-2023-0458</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Status</h4>
                    <p className="font-medium text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Completed
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Signed By</h4>
                    <p className="font-medium">Jane Smith</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Date Signed</h4>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link href="/services">View Your Care Plan</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Heart className="h-4 w-4 text-rose-600" />
              <span className="text-xs font-medium">Attentive Home Care, Inc.</span>
            </div>
            <div className="text-xs text-gray-500">
              Powered by <span className="font-medium">DocuSign</span> • Secure Electronic Signatures
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
