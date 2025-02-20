/* eslint-disable @next/next/no-img-element */
import { Facebook, Instagram, X, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-12 mt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company Info</h3>
            <p className="mb-4 text-justify w-full max-w-2xl mx-auto">
              Random is a premium rental apartment and home website, offering a curated selection of luxury vacation homes across Spain. Whether you're looking for a cozy city apartment or a seaside villa, we've got you covered.
            </p>
         </div>

          

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-4 text-justify w-full max-w-2xl mx-auto">
              Have questions or need assistance? Reach out to us and we will be happy to help you book your next stay!
            </p>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>Email: <Link href="mailto:info@random.com" className="hover:text-gray-600">info@random.com</Link></li>
              <li>Phone: <Link href="tel:+34911223344" className="hover:text-gray-600">+34 91 123 34 44</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-8 h-8 text-red-300 hover:text-gray-400 transition" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-8 h-8 text-red-300 hover:text-gray-400 transition" />
              </Link>
            </div>
          </div>
          <div className="border-t-2"><p className="text-sm text-gray-400">&copy; 2020 Random. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
