import { SearchBar } from "@/components/searchBar";

export default function Home() {

  const data = [
    { name: "John Doe", age: 25, email: "johndoe@example.com" },
    { name: "Jane Smith", age: 30, email: "janesmith@example.com" },
    { name: "Bob Johnson", age: 35, email: "bobjohnson@example.com" },
  ];

  return (
    <div className="width-full text-center max-w-sm mx-auto mt-2">
      <h3 className="px-2 scroll-m-20 text-2xl font-semibold tracking-tight">
        DesiDime - FAQ / Help
      </h3>
      <SearchBar />
    </div>
  );
}
