import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";

// ✅ Import images properly
import todoImg from "../assets/images/todo.jpg";
import trackerImg from "../assets/images/abstract2.jpg";
import pomodoroImg from "../assets/images/abstract1.jpg";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-black mx-auto p-6">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          title="To-Do List"
          description="Manage your daily tasks and stay organized."
          link="/todo"
          image={todoImg} // ✅ Use imported image
        />
        <FeatureCard
          title="Live Tracker"
          description="Track your activities in real-time."
          link="/tracker"
          image={trackerImg} // ✅ Use imported image
        />
        <FeatureCard
          title="Pomodoro Timer"
          description="Boost productivity with focused sessions."
          link="/pomodoro"
          image={pomodoroImg} // ✅ Use imported image
        />
      </div>
    </div>
  );
}
