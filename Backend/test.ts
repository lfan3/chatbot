interface Animal {
    name: string;
    size: "small" | "medium" | "large";
  }
  
  const animalsArray: Animal[] = [
    { name: "chicken", size: "small" },
    { name: "pig", size: "medium" },
    { name: "cow", size: "large" },
  ];

console.log(animalsArray)