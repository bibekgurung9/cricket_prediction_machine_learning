import { navRoutes } from "@/constants";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-12 bg-gray-100 rounded-lg shadow-lg m-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Welcome to Cricket Match Prediction 🎯
      </h1>

      <section className="text-lg text-gray-700 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">About This Project</h2>
        <p>
          Cricket Match Prediction is a web-based platform that uses advanced
          machine learning techniques to predict the outcomes of cricket matches.
          Whether you're watching an ongoing match or analyzing pre-match scenarios,
          our platform provides predictions that help you gauge the likely winner based
          on historical data and live match statistics.
        </p>
      </section>
      
      <section className="text-lg text-gray-700 mt-8">
        <h3 className="text-xl font-sem bold text-gray-800 mb-4 text-center">Look Around</h3>
        <ul className="flex justify-center gap-4 list-none p-0">
          {navRoutes.map((route, idx) => (
            <li key={idx} className="mb-3 text-center">
              <a 
                href={route.href} 
                className="text-white hover:opacity-80 font-medium p-2 bg-black rounded-md"
              >
                {route.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}