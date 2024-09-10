"use client";

import { PlaceholdersAndVanishInput } from "./components/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const [input, setInput] = useState(""); // Declare the 'setInput' function

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onSubmit={onSubmit}
        onChange={e => setInput(e.target.value)}
      />
    </div>
  );
}
function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}

