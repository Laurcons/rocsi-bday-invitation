export function meta() {
  return [
    { title: "Rocsi Birthday" },
    { name: "description", content: "Bun venit la Rocsi Birthday!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rocsi Birthday 2025
        </h1>
        <p className="text-lg text-gray-600">
          Folosește link-ul tău de invitație pentru a accesa invitația!
        </p>
      </div>
    </div>
  );
}
