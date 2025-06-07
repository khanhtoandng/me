import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Scale, AlertTriangle, Shield, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Baraa Alshaer's portfolio website. Learn about the terms and conditions for using our website.",
};

export default function TermsPage() {
  const lastUpdated = "December 2024";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--headline)]">Terms of Service</h1>
          </div>
          <p className="text-lg text-[var(--paragraph)] max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website and services.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--paragraph)]/70">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        <Separator />

        {/* Terms Sections */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                By accessing and using this website (https://alshaer.onrender.com), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-[var(--paragraph)]">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                This website is provided for informational and portfolio purposes. You may:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Browse and view the content for personal use</li>
                <li>Contact us through the provided contact methods</li>
                <li>Share links to our content with proper attribution</li>
                <li>Use the information to evaluate our services</li>
              </ul>
              
              <p className="text-[var(--paragraph)] mt-4">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Copy, reproduce, or distribute content without permission</li>
                <li>Use automated systems to access or scrape the website</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Use the website for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the website's functionality</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                All content on this website, including but not limited to text, graphics, logos, images, code, and design, is the property of Baraa Alshaer and is protected by copyright and other intellectual property laws.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Portfolio Content</h4>
                  <p className="text-sm text-[var(--paragraph)]">
                    Project descriptions, code samples, and design work are original creations or used with proper licensing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Third-Party Content</h4>
                  <p className="text-sm text-[var(--paragraph)]">
                    Some content may include third-party libraries, frameworks, or resources used under their respective licenses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Website Availability</h4>
                <p className="text-[var(--paragraph)]">
                  While we strive to maintain website availability, we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Information Accuracy</h4>
                <p className="text-[var(--paragraph)]">
                  We make every effort to ensure the accuracy of information on this website, but we cannot guarantee that all information is current, complete, or error-free.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">External Links</h4>
                <p className="text-[var(--paragraph)]">
                  Our website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of these external sites.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                To the fullest extent permitted by law, Baraa Alshaer shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Your use or inability to use the website</li>
                <li>Any errors or omissions in the content</li>
                <li>Any interruption or cessation of transmission</li>
                <li>Any bugs, viruses, or similar harmful components</li>
                <li>Any loss of data or profits arising from website use</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                Your privacy is important to us. Please review our{" "}
                <a href="/privacy" className="text-[var(--link-color)] hover:underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your personal information.
              </p>
              <p className="text-[var(--paragraph)]">
                By using this website, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                If you engage our professional services for web development, consulting, or other work:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Separate service agreements will govern the work relationship</li>
                <li>Project scope, timeline, and payment terms will be clearly defined</li>
                <li>Intellectual property rights will be specified in the service agreement</li>
                <li>Professional standards and best practices will be maintained</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>
              <p className="text-[var(--paragraph)]">
                We recommend reviewing these terms periodically to stay informed of any updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                These terms shall be governed by and construed in accordance with applicable international laws and regulations. Any disputes arising from these terms or website use will be resolved through appropriate legal channels.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--paragraph)] mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-[var(--paragraph)]">
                <p><strong>Email:</strong> alshaercontact@gmail.com</p>
                <p><strong>Website:</strong> https://alshaer.onrender.com</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
