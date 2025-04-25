// "use client";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/auth";
// import { useRouter } from "next/navigation";

import HomePage from "@/features/home";

// export default function Home() {
//   const router = useRouter();
//   const { user, clearAuth } = useAuthStore();
//   return (
//     <div>
//       <h1>Homepage</h1>
//       {user ? <p>{user.name}</p> : <p>User tidak ada</p>}
//       {user ? (
//         <Button onClick={clearAuth}>Logout</Button>
//       ) : (
//         <Button onClick={() => router.push("/login")}>Login</Button>
//       )}
//     </div>
//   );
// }

// const Home = () => {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// };

// export default Home;
