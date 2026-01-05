export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl mb-8">
          Have questions or feedback? We'd love to hear from you!
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="mailto:hello@heliosblogs.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  hello@heliosblogs.com
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                For technical support or bug reports, please email{" "}
                <a href="mailto:support@heliosblogs.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@heliosblogs.com
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest news and features on our social media channels.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-blue-600 pl-4 py-2">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> This is a demonstration blog platform. The contact information above is for illustrative purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
