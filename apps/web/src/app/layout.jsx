export const metadata = {
  title: "Algorithms Playground",
  description: "Fibonacci, Merge Sort & Recursive Logic Experiments"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-root">
        {children}
      </body>
    </html>
  );
}
