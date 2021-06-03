import { useFirebase } from "providers/FirebaseProvider";

const HomePage = () => {
  const { logout } = useFirebase();
  return (
    <div>
      <button onClick={logout}>logout</button>Zalogowano
    </div>
  );
};

export default HomePage;
