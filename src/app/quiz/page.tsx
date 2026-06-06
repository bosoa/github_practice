import { QuizSetup } from '@/components/quiz/QuizSetup';

export default function QuizPage() {
  return (
    <div className="pt-6">
      <h1 className="text-xl font-bold text-gray-900 px-4 mb-4">퀴즈</h1>
      <QuizSetup />
    </div>
  );
}
