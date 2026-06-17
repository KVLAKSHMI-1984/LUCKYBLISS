import { useState } from 'react';
import { Button } from '@/components/Button';

const productLinks = ['Features', 'Pricing', 'API Reference', 'Changelog', 'Status'];
const resourceLinks = ['Documentation', 'Tutorials', 'Case Studies', 'Blog', 'Community'];
const companyLinks = ['About', 'Careers', 'Press', 'Contact', 'Partners'];

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="w-full py-16 bg-[#1c1c1c] border-t border-white/[0.06]">
      <div className="container-page">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L24 8V20L14 26L4 20V8L14 2Z" stroke="#f2f2f2" strokeWidth="1.5" fill="none" />
                <path d="M14 2V14M14 14L4 8M14 14L24 8M14 14V26M14 14L4 20M14 14L24 20" stroke="#f2f2f2" strokeWidth="1" opacity="0.5" />
                <circle cx="14" cy="14" r="3" fill="#24a148" />
              </svg>
              <span className="text-[#f2f2f2] font-medium text-sm tracking-tight">VoxelBio</span>
            </div>
            <p className="text-body-small text-[#666666] mb-6 max-w-[200px]">
              AI-powered molecular simulation for drug discovery.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
 
          {/* Product Links */}
          <div>
            <h4 className="text-label text-[#f2f2f2] mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Resources Links */}
          <div>
            <h4 className="text-label text-[#f2f2f2] mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Company Links */}
          <div>
            <h4 className="text-label text-[#f2f2f2] mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-label text-[#f2f2f2] mb-4">Stay updated</h4>
            <p className="text-body-small text-[#666666] mb-4">
              Get the latest research and product updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.12] rounded-sm px-3 py-2 text-body text-[#f2f2f2] placeholder-[#666666] focus:border-[#24a148] focus:outline-none transition-colors duration-200"
              />
              <Button variant="primary" className="px-4 py-2 shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-small text-[#666666]">
            &copy; {new Date().getFullYear()} VoxelBio, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-body-small text-[#666666] hover:text-[#f2f2f2] transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
