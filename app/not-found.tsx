import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Страница не найдена</h2>
      <Link href="/ru" className="text-blue-500 hover:text-blue-700">
        Вернуться на главную
      </Link>
    </div>
  );
}
