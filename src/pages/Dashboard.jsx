import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-black mx-auto p-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          title="To-Do List"
          description="Manage your daily tasks and stay organized."
          link="/todo"
          image="/assets/images/todo.jpg"
        />
        <FeatureCard
          title="Live Tracker"
          description="Track your activities in real-time."
          link="/tracker"
          image="/assets/images/abstract2.jpg"
        />
        <FeatureCard
          title="Pomodoro Timer"
          description="Boost productivity with focused sessions."
          link="/pomodoro"
          image="/assets/images/abstract1.jpg"
        />
      </div>
    </div>
  );
}
