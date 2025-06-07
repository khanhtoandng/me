import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, Database, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Baraa Alshaer's portfolio website. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = "December 2024";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[var(--headline)]">Privacy Policy</h1>
          </div>
          <p className="text-lg text-[var(--paragraph)] max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--paragraph)]/70">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        <Separator />

        {/* Privacy Sections */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-[var(--paragraph)]">
                  When you contact us through our contact form or email, we may collect:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--paragraph)]">
                  <li>Your name and email address</li>
                  <li>Subject and message content</li>
                  <li>Any additional information you choose to provide</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Automatic Information</h4>
                <p className="text-[var(--paragraph)]">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--paragraph)]">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website information</li>
                  <li>Device and screen resolution data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To prevent fraud and ensure website security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>SSL encryption for data transmission</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal information</li>
                <li>Data retention policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                Our website may use third-party services that have their own privacy policies:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Analytics</h4>
                  <p className="text-sm text-[var(--paragraph)]">
                    We use Vercel Analytics to understand website usage and improve performance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Hosting</h4>
                  <p className="text-sm text-[var(--paragraph)]">
                    Our website is hosted on Render, which may collect server logs and technical data.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Email Services</h4>
                  <p className="text-sm text-[var(--paragraph)]">
                    Contact form submissions may be processed through email service providers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to request deletion of your data</li>
                <li>Right to object to data processing</li>
                <li>Right to data portability</li>
              </ul>
              <p className="text-[var(--paragraph)] mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:alshaercontact@gmail.com" className="text-[var(--link-color)] hover:underline">
                  alshaercontact@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[var(--paragraph)]">
                Our website may use cookies and similar technologies to enhance your browsing experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--paragraph)]">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p className="text-[var(--paragraph)] mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--paragraph)] mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2 text-[var(--paragraph)]">
                <p><strong>Email:</strong> alshaercontact@gmail.com</p>
                <p><strong>Website:</strong> https://alshaer.onrender.com</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--paragraph)]">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                with an updated revision date. We encourage you to review this policy periodically to stay 
                informed about how we protect your information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
