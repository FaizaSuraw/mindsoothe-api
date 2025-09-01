const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-white">MindSoothe</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Your personal space for mental wellness. Track moods, journal thoughts, and build better emotional habits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-white transition-colors duration-200">
                About
              </a>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Features
              </a>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="block hover:text-white transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">© 2025 MindSoothe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
