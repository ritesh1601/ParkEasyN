import React from 'react'

const Footer = () => {
  return (
<footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-lg font-bold">ParkEasy</span>
              <span className="text-sm text-gray-500 ml-2">
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact 
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
